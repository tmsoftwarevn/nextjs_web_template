import { BounceLoader } from "react-spinners";
import "./loading.scss";

const LoadingCss = () => {
  return (
   
      <div className="sweet-loading">
        <BounceLoader
          color={"#2124b1"}
          loading={true}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    
  );
};

export default LoadingCss;
