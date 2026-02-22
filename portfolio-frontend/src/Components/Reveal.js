import { useEffect, useRef } from 'react';

// Create a single shared IntersectionObserver to handle all revealed elements
// This is much faster than creating a new observer for every single element.
const observerCallbacks = new Map();

const getSharedObserver = (threshold = 0.1) => {
    // We use a threshold of 0.05 and a bottom margin so it triggers earlier and doesn't wait
    // for a large chunk of tall cards to scroll into view.
    if (!window.__sharedReactRevealObserver) {
        window.__sharedReactRevealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const callback = observerCallbacks.get(entry.target);
                    if (callback) {
                        callback(entry);
                    }
                });
            },
            { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
        );
    }
    return window.__sharedReactRevealObserver;
};

/**
 * Lightweight replacement for react-reveal using IntersectionObserver.
 * Returns a ref to attach to the element. We use a shared observer 
 * to prevent having hundreds of observer instances slowing down the scroll.
 */
export function useReveal(options = {}) {
    const { threshold = 0.1, once = true } = options;
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = getSharedObserver(threshold);

        const callback = (entry) => {
            if (entry.isIntersecting) {
                el.classList.add('revealed');
                if (once) {
                    observer.unobserve(el);
                    observerCallbacks.delete(el);
                }
            } else if (!once) {
                el.classList.remove('revealed');
            }
        };

        observerCallbacks.set(el, callback);
        observer.observe(el);

        return () => {
            observer.unobserve(el);
            observerCallbacks.delete(el);
        };
    }, [threshold, once]);

    return ref;
}

/**
 * Reveal wrapper component — drop-in replacement for react-reveal components.
 * Usage: <Reveal effect="fade-up"> ... </Reveal>
 *
 * Supported effects: fade-up, fade-down, fade-left, fade-right, fade, zoom, flip
 */
export default function Reveal({ children, effect = 'fade-up', delay = 0, cascade = false, className = '', style = {} }) {
    const ref = useReveal();

    return (
        <div
            ref={ref}
            className={`reveal ${effect} ${className}`}
            style={{
                ...style,
                transitionDelay: `${delay}ms`,
            }}
        >
            {cascade && Array.isArray(children)
                ? children.map((child, i) => (
                    <CascadeChild key={i} index={i} delay={delay} effect={effect}>
                        {child}
                    </CascadeChild>
                ))
                : children}
        </div>
    );
}

// Child component for handling cascading animations independently
function CascadeChild({ children, index, delay, effect }) {
    const ref = useReveal();
    return (
        <div
            ref={ref}
            className={`reveal ${effect}`}
            style={{ transitionDelay: `${delay + index * 100}ms` }}
        >
            {children}
        </div>
    );
}
