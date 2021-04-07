import React from "react";

import { Box, Card, CardContent, Spacer } from "react-neu";

import CountUp from 'react-countup';

import FancyValue from "components/FancyValue";

import Split from "components/Split";

interface TopCardProps {
  yamObject: any;
}

const TopCards: React.FC<TopCardProps> = ({yamObject}) => {

  const col = [
    [
      {
        icon: "💲",
        label: "Current price TWAP",
        value: yamObject?.currentPrice ? `${yamObject?.currentPrice} USDC` : "--",
        hint: yamObject?.change24 ? yamObject?.change24 : "-",
        tooltip: "24h Change",
        prefix: 'USDC',
        suffix: '',
       
      },
    ],
    [
      {
        icon: "🧱",
        label: "YAM total supply",
        value: yamObject?.maxSupply ? yamObject?.maxSupply : "--",
        hint: "",
        tooltip: "",
        prefix: '',
        suffix: '',
      },
    ],
    [
      {
        icon: "🌎",
        label: "Marketcap",
        value: yamObject?.marketCap ? `$${yamObject?.marketCap}` : "--",
        hint: "",
        tooltip: "",
        prefix: '',
        suffix: '$',
      },
    ],
    [
      {
        icon: "💰",
        label: "Treasury value",
        value: yamObject?.treasuryValue ? yamObject?.treasuryValue : "--",
        hint: "",
        tooltip: "",
        prefix: '',
        suffix: '~$',
      },
    ],
  ];

  return (
    <Split>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[0][0].icon}
              label={col[0][0].label}
              value={col[0][0].value}
              hint={col[0][0].hint}
              tooltip={col[0][0].tooltip}
              isNum={true}
              prefix={col[0][0].prefix}
              suffix={col[0][0].suffix}
            />
            {/* <CountUp
              start={0}
              end={yamObject?.currentPrice}
              formattingFn={(val) => val ? `${val} USDC` : "--"}
              decimals={0}
              duration={1.75}
              className="top-card-value"
            /> */}
          </CardContent>
        </Card>
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[1][0].icon}
              label={col[1][0].label}
              value={col[1][0].value}
              hint={col[1][0].hint}
              tooltip={col[1][0].tooltip}
              prefix={col[1][0].prefix}
              suffix={col[1][0].suffix}
            />
          </CardContent>
        </Card>
        <Spacer />
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[2][0].icon}
              label={col[2][0].label}
              value={col[2][0].value}
              hint={col[2][0].hint}
              tooltip={col[2][0].tooltip}
              prefix={col[2][0].prefix}
              suffix={col[2][0].suffix}
            />
          </CardContent>
        </Card>
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[3][0].icon}
              label={col[3][0].label}
              value={col[3][0].value}
              hint={col[3][0].hint}
              tooltip={col[3][0].tooltip}
              prefix={col[3][0].prefix}
              suffix={col[3][0].suffix}
            />
          </CardContent>
        </Card>
      </Box>
    </Split>
  );
};

export default TopCards;
