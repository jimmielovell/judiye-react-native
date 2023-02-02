import {Component, ErrorInfo, ReactNode} from 'react';
import {Frame, Flex} from 'components/layout';
import {Text} from 'components/typography';

function FallbackUI({error, errorInfo}: {error: Error; errorInfo: ErrorInfo}) {
  return (
    <Frame>
      <Text>Something went wrong</Text>
      <Flex>
        <Text>{error.toString()}</Text>
        <Text>{errorInfo.componentStack}</Text>
      </Flex>
    </Frame>
  );
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<{children: ReactNode}, State> {
  state: State = {error: null, errorInfo: null};

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
      return (
        <FallbackUI error={this.state.error} errorInfo={this.state.errorInfo} />
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
