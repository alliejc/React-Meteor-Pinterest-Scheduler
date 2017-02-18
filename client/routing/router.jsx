import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from '/client/layouts/mainLayout.jsx';
import Content from '/client/components/content.jsx';
import Header from '/client/components/header.jsx';
import Footer from '/client/components/footer.jsx';
import SubHeader from '/client/components/subheader.jsx'

FlowRouter.route("/", {
    action () {
        mount(MainLayout, {
            header: <Header/>,
            subheader: <SubHeader/>,
            footer: <Footer/>
        });
    }
});