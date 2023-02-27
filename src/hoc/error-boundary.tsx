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

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {error: null, errorInfo: null};

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.error && this.state.errorInfo) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <FallbackUI error={this.state.error} errorInfo={this.state.errorInfo} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
