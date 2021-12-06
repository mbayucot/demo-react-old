import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchBar from '../components/SearchBar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SearchBar',
  component: SearchBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: '',
    onChange: { action: 'clicked' },
    clearSearch: { action: 'clicked' },
  },
} as unknown as ComponentMeta<typeof SearchBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  value: '',
};

export const Secondary = Template.bind({});
Secondary.args = {
  value: 'query',
};
