import React from 'react';

import { VictoryLineChart } from './Victory/Line';

export default {
  title: 'Example/VictoryLine',
  component: VictoryLineChart,
};

const Template = (args) => <VictoryLineChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'VictoryLineChart',
};
