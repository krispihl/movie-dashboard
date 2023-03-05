import React, { ErrorInfo } from 'react';
import { ErrorView } from '../ErrorView';

type Props = {
    children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props> {
    state = {
        errorMessage: '',
    };

    static getDerivedStateFromError(error: Error) {
        return { errorMessage: error.toString() };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // In live app should send a message to some logger service
        console.log('Error was thrown while rendering', error.toString(), info.componentStack);
    }

    render() {
        if (this.state.errorMessage) {
            return <ErrorView fullHeight />;
        }

        return this.props.children;
    }
};
