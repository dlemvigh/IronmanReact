import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchShape, routerShape } from "found";

const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

class LinkContainer extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func,
    replace: PropTypes.bool,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    style: PropTypes.object,
    activeStyle: PropTypes.object,
    isActive: PropTypes.func,
    match: matchShape.isRequired,
    router: routerShape.isRequired,
  };

  static defaultProps = {
    replace: false,
    exact: false,
    strict: false,
    activeClassName: 'active',
  };

  handleClick = (event) => {
    const { children, onClick } = this.props;

    if (children.props.onClick) {
      children.props.onClick(event);
    }

    if (onClick) {
      onClick(event);
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      const { router, replace, to } = this.props;

      if (replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    }
  }

  render() {
    const {
      children,
      replace, // eslint-disable-line no-unused-vars
      to,
      exact,
      strict,
      activeClassName,
      className,
      activeStyle,
      style,
      isActive: getIsActive,
      router,
      match,
      ...props,
    } = this.props;

    const child = React.Children.only(children);
    const isActive = getIsActive ? 
      getIsActive(match, router.location) : 
      router.isActive(match, { pathname: to }, { exact });

    return React.cloneElement(
      child,
      {
        ...props,
        className: [className, child.props.className, isActive ? activeClassName : null]
          .join(' ').trim(),
        style: isActive ? { ...style, ...activeStyle } : style,
        href: to,
        onClick: this.handleClick,
      }
    );

  }
}

export default withRouter(LinkContainer);