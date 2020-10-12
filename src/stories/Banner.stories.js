import React from 'react';

import { Banner } from './Banner';

export default {
  title: 'Example/Banner',
  component: Banner,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Banner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Banner',
  textHeader: 'Primary',
  textBody: 'Some body text here',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Banner',
  textHeader: 'Secondary',
  textBody: 'Some body text here',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Banner',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Banner',
};
