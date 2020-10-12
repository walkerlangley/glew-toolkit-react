import React from 'react';

import { RechartLine } from './ReCharts/Line';

export default {
  title: 'Example/RechartLine',
  component: RechartLine,
};

const Template = (args) => <RechartLine {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'RechartLine',
};
