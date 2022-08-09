import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Fancybox } from '@codelab/frontend/view/components'
import { css } from '@emotion/react'
import { Button, Col, Image, Row, Space, Typography } from 'antd'
import $ from 'jquery'
import React, { useEffect, useRef } from 'react'
import tw from 'twin.macro'

const { Title, Text, Paragraph } = Typography

// const Fancybox = dynamic<any>(
//   () => import('@codelab/frontend/view/components').then((mod) => mod.Fancybox),
//   { ssr: false },
// )

export const HomeJumbo = () => {
  const jsRotatingRef = useRef(null)

  useEffect(() => {
    window.jQuery = $
    window.Morphtext = require('node_modules/morphext/dist/morphext.min.js')
    ;($(jsRotatingRef.current!) as any).Morphext({
      // The [in] animation type. Refer to Animate.css for a list of available animations.
      animation: 'animate__animated animate__fadeIn',
      // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
      separator: ',',
      // The delay between the changing of each phrase in milliseconds.
      speed: 2200,
      complete: function () {
        // Called after the entrance animation is executed.
      },
    })
  })

  return (
    <>
      <section
        className="container"
        css={[
          tw`m-auto`,
          tw`

    `,
        ]}
      >
        <Row css={tw`my-8 justify-center`}>
          <Col css={tw`flex-col flex items-center`} style={{ width: '62rem' }}>
            <h1 css={tw`text-center !text-5xl leading-tight font-bold`}>
              Build Using&nbsp;
              <span
                css={tw`bg-red-100 inline-block`}
                style={{ minWidth: '20rem' }}
              >
                <span
                  className="animate__animated animate__fadeIn"
                  ref={jsRotatingRef}
                >
                  Ant Design, Material UI, Semantic UI, HTML tags
                </span>
                <br />
              </span>
              <br />
              Without Template Limitations
            </h1>
            <p
              css={tw`text-center text-lg px-16 py-4 leading-normal font-light w-3/4`}
            >
              Nest components or HTML to construct the DOM tree as you would in
              code. Configure props provided by UI frameworks so you can save
              time.
            </p>
            <Space align="center" css={tw`w-full justify-center`} size="large">
              <Fancybox
                options={{
                  infinite: false,
                  closeButton: 'outside',
                }}
              >
                <p>
                  <Button
                    css={tw`bg-purple-700`}
                    data-fancybox="gallery"
                    data-src="https://www.youtube.com/watch?v=OrmhGmr0iTA"
                    icon={<ArrowRightOutlined />}
                    size="large"
                    type="primary"
                  >
                    Watch Tutorial
                  </Button>
                </p>
              </Fancybox>
              <Button
                ghost
                icon={<ArrowRightOutlined />}
                size="large"
                type="primary"
              >
                Log In
              </Button>
            </Space>
          </Col>

          <div
            css={[
              css`
                &:hover img {
                  transform: scale(0.92);
                  transition-duration: 0.6s;
                }
                &:hover .watch-content {
                  transform: scale(1.08);
                  transition-duration: 0.6s;
                }
                & img,
                & .watch-content {
                  transition-duration: 0.6s;
                }
              `,
              tw`hover:cursor-pointer relative`,
            ]}
          >
            <Image
              css={tw`mt-8 `}
              preview={false}
              src="/banner-screenshot.png"
            />
            <div
              className="watch-content"
              css={[
                tw`absolute bg-white z-10 text-2xl flex justify-center`,
                css`
                  width: 640px;
                  height: 80px;
                  left: calc(50% - 320px);
                  top: calc(50% - 40px);
                `,
              ]}
            >
              <PlayCircleOutlined css={tw`w-12 text-3xl mt-6`} />
              <span
                css={[
                  tw`flex self-center text-2xl`,
                  css`
                    line-height: 80px;
                  `,
                ]}
              >
                Watch how to build a products page with Shopify.
              </span>
            </div>
          </div>
        </Row>
      </section>
      <div css={tw`relative`}>
        {/* Generated from https://getwaves.io/ */}
        <svg
          // css={tw`fill-yellow-500`}
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64L80,96C160,128,320,192,480,218.7C640,245,800,235,960,202.7C1120,171,1280,117,1360,90.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            // <svg /> fill-yellow-500 has issues
            // fill="#eab308"
            fill="#facc15"
            fillOpacity="1"
          ></path>
        </svg>
      </div>
    </>
  )
}