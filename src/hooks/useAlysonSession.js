import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { analytics } from "../analytics";
import { trackPageView } from "../analytics/track";

const AUTH_TOKEN = import.meta.env.VITE_ALYSON_AUTH_TOKEN;
const API_URL = 'https://api.palisade.ai/api/alyson-session/params';

// Helper function to send Segment page event
const sendSegmentPageEvent = (sessionId, status, errorMessage, isPageView) => {
    if (!analytics) return;

    const properties = {
        sessionId: sessionId || '',
        status: status || '',
        errorMessage: errorMessage || '',
        timestamp: new Date().toISOString(),
    };

    if (isPageView) {
        trackPageView('Alyson Session', properties);
    } else {
        analytics.track('Alyson Session Event', properties);
    }
};

export function useAlysonSession() {
    const [params, setParams] = useSearchParams();
    const [sessionId, setSessionId] = useState(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        const savedSessionId = sessionStorage.getItem('alysonSessionId');

        if (savedSessionId) {
            // If sessionId exists, send it with the Segment page event
            setSessionId(savedSessionId);
            window.alysonSessionId = savedSessionId;
            sendSegmentPageEvent(savedSessionId, 'success', '', true);
            window.pageUrl = new URLSearchParams(window.location.search);
        } else {
            // Initial Segment page event
            sendSegmentPageEvent('', '', '', false);

            const pageUrl = window.location.href;

            const fetchSessionId = async () => {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 5000);

                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'x-auth-token': AUTH_TOKEN,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ pageUrl }),
                        signal: controller.signal,
                    });

                    clearTimeout(timeoutId);

                    if (response.status === 200) {
                        const data = await response.json();
                        const alysonSessionId = data?.data?.[0]?.alyson_session_id;

                        if (!alysonSessionId) {
                            console.warn('No sessionId returned in response');
                            sendSegmentPageEvent('', 'error', 'Missing sessionId in response', true);
                            return;
                        }

                        // Save sessionId
                        window.alysonSessionId = alysonSessionId;
                        sessionStorage.setItem('alysonSessionId', alysonSessionId);
                        setSessionId(alysonSessionId);

                        // Update URL parameters
                        const parser = new URL(window.location.href);
                        const searchParams = parser.searchParams;
                        // searchParams.set('utm_content', alysonSessionId || searchParams.get('utm_content'));
                        searchParams.set('sessionId', alysonSessionId);
                        searchParams.set('d', '1');
                        searchParams.set('checkoutId', '28');

                        const newUrl = `${parser.origin}${parser.pathname}?${searchParams.toString()}${parser.hash}`;
                        window.history.replaceState({}, '', newUrl);

                        // Update React Router params to keep in sync
                        const newParams = new URLSearchParams(searchParams);
                        setParams(newParams, { replace: true });

                        // Track success with Segment
                        sendSegmentPageEvent(alysonSessionId, 'success', '', true);
                    } else {
                        const errorText = await response.text();
                        console.error(`Request failed with status ${response.status}`, errorText);
                        sendSegmentPageEvent('', 'error', `Status ${response.status}`, true);
                    }
                } catch (error) {
                    if (error.name === 'AbortError') {
                        console.error('Request timed out');
                        sendSegmentPageEvent('', 'network-error', 'Request timeout', false);
                    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                        console.error('Network error occurred');
                        sendSegmentPageEvent('', 'network-error', 'Network error', false);
                    } else {
                        console.error('Unexpected error:', error);
                        sendSegmentPageEvent('', 'error', error.message, false);
                    }
                }
            };

            fetchSessionId();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount, initializedRef ensures this

    return { sessionId };
}

