import React from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import Charts from "../util/charts";

export default function ChartReportComponent(props) {
  let activeItem = "bio";

  const handleItemClick = (e, { name }) => (activeItem = name);

  return (
    <div className="chart-report">
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="bio"
              active={activeItem === "bio"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="pics"
              active={activeItem === "pics"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="companies"
              active={activeItem === "companies"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="links"
              active={activeItem === "links"}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <div className="chart-container">
              <Charts {...props} />
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}
