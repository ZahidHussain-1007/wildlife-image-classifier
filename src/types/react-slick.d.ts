declare module 'react-slick' {
  import * as React from 'react';

  export interface Settings {
    children?: React.ReactNode;
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    arrows?: boolean;
  }

  export default class Slider extends React.Component<Settings> {
    slickNext(): void;
    slickPrev(): void;
  }
}
