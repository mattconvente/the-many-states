import { ImageResponse } from "next/og";
import { IStar } from '@/app/types';
import { stars } from '@/app/data';

export const runtime = "edge";

async function loadGoogleFont (font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const visitedStates = searchParams.get("visitedStates");
    const numVisitedStates = visitedStates?.split(",")
      .filter((visitedState) => visitedState !== "")
      .length;

    const numVisitedStatesText =
      numVisitedStates === 50
        ? "I've visited all\u00A050\u00A0states!"
        : `I've visited ${numVisitedStates}\u00A0of\u00A050\u00A0states!`;

    return new ImageResponse(
      (
        <div
          style={{
            fontFamily: "Libre+Caslon+Text",
            display: "flex",
            color: "#171717",
            background: "#ECE7C1",
            width: "100%",
            height: "100%",
            padding: "0px",
            margin: "0px",
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "40%",
            paddingLeft: "160px",
            paddingRight: "160px",
            paddingTop: "310px",
          }}>
            <svg width="630" height="544" viewBox="0 0 315 272" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M71.1088 0V30.9008H62.62V25.771C62.62 13.8015 56.3456 8.30534 43.6739 8.30534V62.5344C43.6739 65.4657 44.7812 66.5649 48.3489 66.5649H56.9608V74.9924H14.5167V66.5649H23.1285C26.6963 66.5649 27.8035 65.4657 27.8035 62.5344V8.42748C15.1318 8.42748 8.85749 13.8015 8.85749 25.8931V31.0229H0.491699V0H71.1088ZM99.1588 31.0229H99.4049C104.08 24.916 110.354 20.3969 119.212 20.3969C129.177 20.3969 135.329 26.626 135.329 36.2748V63.0229C135.329 66.3206 136.682 67.542 139.881 67.542H146.278V74.9924H113.061V67.542H117.367C120.565 67.542 121.919 66.3206 121.919 63.0229V37.1298C121.919 31.3893 117.982 29.1908 111.954 29.1908C106.048 29.1908 99.1588 35.4198 99.1588 45.313V62.9008C99.1588 66.1985 100.512 67.4199 103.711 67.4199H108.263V74.8702H74.6766V67.4199H81.197C84.3956 67.4199 85.7489 66.1985 85.7489 62.9008V11.9695C85.7489 8.67176 84.3956 7.45038 81.197 7.45038H74.6766V0H99.1588V31.0229ZM160.18 49.8321C159.811 58.626 162.517 68.1527 173.221 68.1527C181.463 68.1527 185.523 64 187 56.1832H196.473C194.996 69.1298 187.123 76.7023 171.99 76.7023C154.275 76.7023 145.048 66.8092 145.048 48.4886C145.048 32 155.751 20.2748 171.498 20.2748C190.198 20.2748 198.072 36.8855 196.842 49.8321H160.18ZM181.34 42.3817C181.463 35.2977 179.126 28.2137 171.129 28.2137C163.379 28.2137 160.549 35.1756 160.18 42.3817H181.34Z" fill="#B31942"/>
              <path d="M23.498 160.122C23.498 162.809 26.2046 163.908 28.6651 163.908H35.6776V172.336H0V163.908H6.76645C10.4572 163.908 11.6875 162.809 11.6875 160.122V109.557C11.6875 106.87 9.84211 105.771 7.25855 105.771H0V97.3435H35.8007L51.1789 146.321H51.425L68.7717 97.3435H103.219V105.771H95.5914C93.0079 105.771 91.1625 106.87 91.1625 109.557V158.534C91.1625 162.198 92.8849 163.908 96.0836 163.908H103.219V172.336H63.6046V163.908H71.1092C74.1849 163.908 76.0303 162.321 76.0303 160.122V108.702H75.7842L54.0086 172.336H44.5355L23.7441 108.702H23.498V160.122ZM165.716 152.672V156.092C165.716 168.794 160.549 174.046 151.076 174.046C145.417 174.046 140.496 171.725 139.512 165.618C135.329 171.969 127.947 174.046 120.812 174.046C111.954 174.046 104.941 169.893 104.941 159.634C104.941 137.649 139.143 148.275 139.143 132.397C139.143 125.191 132.991 123.847 126.963 123.847C123.764 123.847 118.474 124.824 116.383 127.634C120.566 127.023 123.888 128.855 123.888 133.496C123.888 138.626 120.32 140.214 115.891 140.214C110.97 140.214 107.648 136.427 107.648 131.786C107.648 120.305 121.55 117.74 130.531 117.74C145.909 117.74 152.553 124.58 152.553 134.107V161.832C152.553 164.275 153.537 165.618 155.259 165.618C156.982 165.618 158.335 164.031 158.335 157.069V152.672H165.716ZM139.143 144.366L127.086 149.74C123.764 151.206 120.197 153.038 120.197 158.29C120.197 163.053 122.411 165.374 127.086 165.374C134.837 165.374 139.143 158.779 139.143 151.573V144.366Z" fill="#0A3161"/>
              <path d="M190.076 129.221H190.322C194.997 122.26 201.271 117.74 210.129 117.74C220.094 117.74 226.246 123.725 226.246 135.939V160.366C226.246 163.664 227.599 164.886 233.135 164.886H237.195V172.336H203.978V164.886H206.685C211.483 164.886 212.836 163.664 212.836 160.366V136.794C212.836 128.366 208.284 126.534 202.871 126.534C197.458 126.534 190.076 132.275 190.076 139.481V160.244C190.076 163.542 191.429 164.763 194.628 164.763H199.057V172.214H165.594V164.886H172.114C175.313 164.886 176.666 163.664 176.666 160.366V133.008C176.666 128.122 175.313 126.901 169.408 126.901H165.594V119.45H190.076V129.221Z" fill="#0A3161"/>
              <path d="M234.488 119.45H267.459V126.901H262.538C260.57 126.901 259.217 127.634 259.217 129.344C259.217 130.076 259.832 131.42 260.201 132.519L270.412 156.458H270.658L280.131 133.496C280.746 132.153 281.115 130.931 281.115 129.588C281.115 128.122 279.516 126.901 277.424 126.901H272.503V119.45H300.184V126.901C296.124 126.901 292.68 127.634 290.834 132.031L272.38 175.512C266.106 190.29 260.201 196.275 249.621 196.275C241.747 196.275 234.488 191.512 234.488 182.595C234.488 177.099 237.564 172.702 243.223 172.702C247.283 172.702 251.097 175.634 251.097 179.786C251.097 183.328 248.636 186.26 245.561 186.26C244.699 186.26 243.469 186.137 242.608 186.137C243.838 188.336 246.053 188.824 248.144 188.824C255.034 188.824 258.232 185.283 260.447 180.519L264.261 172.214L245.069 131.176C243.715 128.244 240.517 126.779 234.734 126.779V119.45H234.488Z" fill="#0A3161"/>
              <path d="M54.6234 194.809H61.2668V223.267H53.024C50.3174 210.931 43.0589 202.137 29.526 202.137C18.9457 202.137 14.6398 204.824 14.6398 212.275C14.6398 229.252 65.4497 216.55 65.4497 248.183C65.4497 266.137 51.3017 272 35.4313 272C26.9424 272 18.3306 268.336 11.6872 263.084L9.22665 269.802H1.47599V239.145H9.96481C11.5642 254.29 20.9142 262.473 37.0306 262.473C46.9957 262.473 51.7938 257.832 51.7938 252.458C51.7938 233.16 0.983887 247.695 0.983887 215.328C0.983887 199.328 15.501 192.611 29.2799 192.611C37.8918 192.611 45.2734 196.519 50.9326 200.55L54.6234 194.809ZM65.6957 224.244V217.16C77.2602 216.428 80.3359 206.168 81.3201 195.786H88.3326V216.794H103.342V224.244H88.7017V257.588C88.7017 259.908 89.9319 261.374 93.0076 261.374C96.5753 261.374 97.9286 259.42 97.9286 254.901V244.886H105.433V254.412C105.433 266.26 98.7898 271.511 89.8089 271.511C81.3201 271.511 75.1688 267.969 75.1688 258.931V224.366H65.6957V224.244ZM170.391 250.015V253.435C170.391 266.137 165.224 271.389 155.751 271.389C150.092 271.389 145.171 269.069 144.187 262.962C140.004 269.313 132.622 271.389 125.487 271.389C116.629 271.389 109.616 267.237 109.616 256.977C109.616 234.992 143.817 245.618 143.817 229.741C143.817 222.534 137.666 221.191 131.638 221.191C128.439 221.191 123.149 222.168 121.058 224.977C125.24 224.366 128.562 226.199 128.562 230.84C128.562 235.969 124.994 237.557 120.565 237.557C115.644 237.557 112.323 233.771 112.323 229.13C112.323 217.649 126.225 215.084 135.206 215.084C150.584 215.084 157.227 221.924 157.227 231.45V259.176C157.227 261.618 158.212 262.962 159.934 262.962C161.656 262.962 163.01 261.374 163.01 254.412V250.137H170.391V250.015ZM143.817 241.832L131.761 247.206C128.439 248.672 124.871 250.504 124.871 255.756C124.871 260.519 127.086 262.84 131.761 262.84C139.512 262.84 143.817 256.244 143.817 249.038V241.832ZM165.593 224.244V217.16C177.158 216.428 180.233 206.168 181.217 195.786H188.23V216.794H203.239V224.244H188.599V257.588C188.599 259.908 189.829 261.374 192.905 261.374C196.473 261.374 197.826 259.42 197.826 254.901V244.886H205.331V254.412C205.331 266.26 198.687 271.511 189.706 271.511C181.217 271.511 175.066 267.969 175.066 258.931V224.366H165.593V224.244ZM224.277 244.641C223.908 253.435 226.614 262.962 237.317 262.962C245.56 262.962 249.62 258.809 251.096 250.992H260.569C259.093 263.939 251.219 271.511 236.087 271.511C218.371 271.511 209.144 261.618 209.144 243.298C209.144 226.809 219.848 215.084 235.595 215.084C254.295 215.084 262.169 231.695 260.939 244.641H224.277ZM245.437 237.191C245.56 230.107 243.223 223.023 235.226 223.023C227.475 223.023 224.646 229.985 224.277 237.191H245.437ZM273.61 249.038C275.948 258.931 282.837 263.817 292.802 263.817C296.739 263.817 301.66 261.618 301.66 256.977C301.66 245.863 265.737 252.214 265.737 231.939C265.737 220.702 276.563 214.962 286.528 214.962C292.556 214.962 298.339 217.282 303.26 220.458L305.597 216.672H311.871V235.725H304.49C301.783 227.42 296.37 223.267 287.635 223.267C283.821 223.267 279.023 224.855 279.023 229.374C279.023 238.168 314.947 234.015 314.947 254.657C314.947 266.504 304.859 271.389 294.156 271.389C287.266 271.389 280.5 270.29 275.087 265.649L272.749 269.679H265.244V249.038H273.61Z" fill="#B31942"/>
            </svg>
            <p style={{
              fontSize: 72,
              lineHeight: 1.5,
              marginTop: "120px",
              marginBottom: 0,
              textAlign: "center",
            }}>
              {numVisitedStatesText}
            </p>
          </div>
          <div style={{
            display: "flex",
            flexBasis: "60%",
          }}>
            <svg
              width="2394"
              height="1260"
              viewBox="0 0 1235 650"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path id="white-bg" d="M1235 0H0V650H1235V0Z" fill="#FFF" />
                <path id="stripe-1" d="M1235 0H0V50H1235V0Z" fill="#B31942" />
                <path id="stripe-3" d="M1235 100H0V150H1235V100Z" fill="#B31942" />
                <path id="stripe-5" d="M1235 200H0V250H1235V200Z" fill="#B31942" />
                <path id="stripe-7" d="M1235 300H0V350H1235V300Z" fill="#B31942" />
                <path id="stripe-9" d="M1235 400H0V450H1235V400Z" fill="#B31942" />
                <path id="stripe-11" d="M1235 500H0V550H1235V500Z" fill="#B31942" />
                <path id="stripe-13" d="M1235 600H0V650H1235V600Z" fill="#B31942" />
                <g id="union">
                  <path id="union-bg" d="M494 0H0V350H494V0Z" fill="#0A3161" />
                  <g id="stars">
                    {stars.map((star: IStar) => {
                      const starFillColor = visitedStates?.includes(star.abbr)
                        ? "#FFF"
                        : "#0A3161";

                      return <path
                        key={star.abbr}
                        fill={starFillColor}
                        id={star.abbr}
                        d={star.pathCoordinates}
                      />
                    })}
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      ),
      {
        width: 2400,
        height: 1260,
        fonts: [
          {
            name: "Libre+Caslon+Text",
            data: await loadGoogleFont("Libre+Caslon+Text", numVisitedStatesText),
            style: "normal",
            weight: 400,
          }
        ],
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, immutable, no-transform, max-age=31536000",
        },
      },
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
