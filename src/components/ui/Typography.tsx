import React, { forwardRef, ReactNode } from "react";

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function H1Component(
  { children, ...props }: H1Props,
  ref: React.Ref<HTMLHeadingElement>,
) {
  return (
    <h1
      ref={ref}
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${
        props.className || ""
      }`}
      {...props}
    >
      {children}
    </h1>
  );
}
export const H1 = forwardRef<HTMLHeadingElement, H1Props>(H1Component);

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function H2Component(
  { children, ...props }: H2Props,
  ref: React.Ref<HTMLHeadingElement>,
) {
  return (
    <h2
      ref={ref}
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${
        props.className || ""
      }`}
      {...props}
    >
      {children}
    </h2>
  );
}
export const H2 = forwardRef<HTMLHeadingElement, H2Props>(H2Component);

interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function H3Component(
  { children, ...props }: H3Props,
  ref: React.Ref<HTMLHeadingElement>,
) {
  return (
    <h3
      ref={ref}
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${
        props.className || ""
      }`}
      {...props}
    >
      {children}
    </h3>
  );
}
export const H3 = forwardRef<HTMLHeadingElement, H3Props>(H3Component);

interface H4Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function H4Component(
  { children, ...props }: H4Props,
  ref: React.Ref<HTMLHeadingElement>,
) {
  return (
    <h4
      ref={ref}
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${
        props.className || ""
      }`}
      {...props}
    >
      {children}
    </h4>
  );
}
export const H4 = forwardRef<HTMLHeadingElement, H4Props>(H4Component);

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

function PComponent(
  { children, ...props }: PProps,
  ref: React.Ref<HTMLParagraphElement>,
) {
  return (
    <p
      ref={ref}
      className={`leading-7 [&:not(:first-child)]:mt-6 ${
        props.className || ""
      }`}
      {...props}
    >
      {children}
    </p>
  );
}
export const P = forwardRef<HTMLParagraphElement, PProps>(PComponent);
