import "../styles/globals.css";
import "../styles/tailwind.css";
import Login from '../pages/Login';

export default function App({ Component, pageProps }) {
  return (
    <div className="text-gray-100">
      <Component {...pageProps} />
    </div>
  );
}
