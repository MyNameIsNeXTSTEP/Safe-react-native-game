declare module "*.svg" {
    import React from 'react';
  
    interface SvgProps extends React.SVGProps<SVGElement> {
      // Add any custom properties you need
    }
  
    const component: React.ComponentType<SvgProps>;
    export default component;
  }