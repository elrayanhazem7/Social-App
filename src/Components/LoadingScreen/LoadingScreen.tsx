import { Oval } from "react-loader-spinner";

export default function LoadingScreen() {
  return (
    <>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#2ccce4"
        secondaryColor="#2ccce4"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    </>
  );
}
