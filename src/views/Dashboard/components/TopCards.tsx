import React from "react";

import { Box, Card, CardContent, Spacer } from "react-neu";

import FancyValue from "components/FancyValue";

import Split from "components/Split";

interface TopCardProps {
  currentPrice:any;
  change24:any;
  maxSupply:any;
  marketCap:any;
  treasuryValue:any;
}

const TopCards: React.FC<TopCardProps> = ({currentPrice, change24, maxSupply, marketCap, treasuryValue}) => {

  const col = [
    [
      {
        icon: "💲",
        label: "Current price TWAP",
        value: currentPrice ? `${currentPrice} USDC` : "--",
        hint: change24 ? change24 : "-",
        tooltip: "24h Change",
      },
    ],
    [
      {
        icon: "🧱",
        label: "YAM total supply",
        value: maxSupply ? maxSupply : "--",
        hint: "",
        tooltip: "",
      },
    ],
    [
      {
        icon: "🌎",
        label: "Marketcap",
        value: marketCap ? `$${marketCap}` : "--",
        hint: "",
        tooltip: "",
      },
    ],
    [
      {
        icon: "💰",
        label: "Treasury value",
        value: treasuryValue ? treasuryValue : "--",
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
