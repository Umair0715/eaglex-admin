import RichEditor from "components/global/RichEditor";
import BackBtn from "components/global/BackBtn";
import Heading from "components/global/Heading";
import Layout from "components/global/Layout";
import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <Layout>
            <div>
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <Heading title="Privacy Policy" showIcon={false} />
                    </div>
                    <div>
                        <BackBtn />
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <RichEditor
                    content="
                    <h1>EagleX , Privacy Policy </h1>
                    <br />
                    <h3>Privacy
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum natus officia hic numquam repudiandae officiis expedita iusto ullam laborum labore vel eligendi ipsum, tempore odio ea mollitia libero quo quidem voluptate rem adipisci blanditiis quibusdam veritatis. Dolor architecto dicta alias doloribus harum quidem similique deleniti! Perspiciatis, ea deserunt in officiis accusamus optio labore deleniti, iusto dolor doloremque laborum reiciendis. Magnam, illo? Ipsam asperiores pariatur nihil quod. Cumque odio quisquam voluptate eveniet accusamus vero veniam libero atque excepturi facere. Minima, provident doloremque accusantium dolorem sit quibusdam nulla optio ad maxime exercitationem earum cum nemo porro fugiat consequatur obcaecati beatae, aliquam cupiditate!</h3>
                    <br />
                    <h3>quibusdam nulla optio ad maxime exercitationem earum cum nemo porro fugiat consequatur obcaecati beatae, aliquam cupiditate!  optio labore deleniti, iusto dolor doloremque laborum reiciendis. Magnam, illo? Ipsam asperiores pariatur nihil quod. Cumque odio quisquam voluptate eveniet accusamus vero veniam libero nihil quod. Cumque odio quisquam voluptate eveniet accusamus vero veniam libero atque excepturi facere. Minima, provident doloremque accusantium dolorem sit quibusdam nulla optio ad maxime </h3>
                    "
                />
            </div>
            <div className="md:mt-10 sm:mt-14 mt-20 " >
                <button className="btn-primary py-2 px-12">Save</button>
            </div>
        </Layout>
    );
};

export default PrivacyPolicy;
