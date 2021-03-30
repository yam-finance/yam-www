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
      },
    ],
    [
      {
        icon: "🧱",
        label: "YAM total supply",
        value: yamObject?.maxSupply ? yamObject?.maxSupply : "--",
        hint: "",
        tooltip: "",
      },
    ],
    [
      {
        icon: "🌎",
        label: "Marketcap",
        value: yamObject?.marketCap ? `$${yamObject?.marketCap}` : "--",
        hint: "",
        tooltip: "",
      },
    ],
    [
      {
        icon: "💰",
        label: "Treasury value",
        value: yamObject?.treasuryValue ? yamObject?.treasuryValue : "--",
        hint: "",
        tooltip: "",
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
            />
          </CardContent>
        </Card>
      </Box>
    </Split>
  );
};

export default TopCards;
