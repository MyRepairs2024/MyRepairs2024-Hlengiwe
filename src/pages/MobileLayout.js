import React from 'react';
import styled from 'styled-components';

const MobileLayout = styled.div`
  /* Mobile-specific styles go here */
  padding: 20px;
`;

const DesktopLayout = styled.div`
  /* Desktop-specific styles go here */
  max-width: 1200px;
  margin: 0 auto;
`;

const ResponsiveLayout = ({ children }) => {
  const breakpoint = 768;

  return (
    <>
      {window.innerWidth < breakpoint ? (
        <MobileLayout>{children}</MobileLayout>
      ) : (
        <DesktopLayout>{children}</DesktopLayout>
      )}
    </>
  );
};

export default MobileLayout;