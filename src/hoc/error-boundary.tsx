import {Component, ErrorInfo, ReactNode} from 'react';
import {Text} from 'react-native';
import {Frame, FView} from 'components/layout';

function FallbackUI({error, errorInfo}: {error: Error; errorInfo: ErrorInfo}) {
  return (
    <Frame>
      <Text>Something went wrong</Text>
      <FView>
        {error.toString()}
        {errorInfo.componentStack}
      </FView>
    </Frame>
  );
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<{children: ReactNode}, State> {
  state: State = {error: null, errorInfo: null};

  // static getDerivedStateFromError(_: Error): State {
  //   // Update state so the next render will show the fallback UI.
  //   return {hasError: true};
  // }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.error && this.state.errorInfo) {
      // Error path
      return (
        <FallbackUI error={this.state.error} errorInfo={this.state.errorInfo} />
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
