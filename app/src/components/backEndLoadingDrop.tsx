import { useState, useEffect } from 'react';
import { Backdrop } from './backdrop';

const BackendLoadingBackdrop = ({ isLoading }) => {
  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setTimeout(() => {
        setShowBackdrop(true); // Show backdrop if loading > 6 seconds
      }, 6000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading]);

  const handleCloseBackdrop = () => {
    setShowBackdrop(false);
  };

  return (
    <Backdrop
      open={isLoading && showBackdrop}
      variant="blur"
      closeOnClick={true}
      onClose={handleCloseBackdrop}
    >
      <div className="animate-pulse space-y-6 text-black dark:text-white">
        <h2 className="text-2xl font-bold text-primary text-center">
          Backend Is Starting
        </h2>

        <p className="text-base leading-relaxed text-center">
          Backend is deployed on a free instance which will spin down with inactivity.
          This may delay requests by 50 seconds or more.
          <span className="block font-medium mt-2">Please hold tight!</span>
        </p>

        <div className="pt-4">
          <p className="text-sm font-medium text-center">
            Click anywhere to close this message
          </p>
        </div>

        <div className="rounded-lg p-4">
          <p className="text-sm text-center">
            Feeling stuck?
            <span className="block text-primary font-medium mt-1">
              Feel free to reload the page
            </span>
          </p>
        </div>

        <p className="text-lg font-medium text-primary text-center">
          Thank you for your patience!
        </p>
      </div>
    </Backdrop>
  );
};

export default BackendLoadingBackdrop;