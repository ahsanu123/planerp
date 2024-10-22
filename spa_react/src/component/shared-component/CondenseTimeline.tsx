import { Octicon, Stack, Timeline, Text, Truncate, Header, Button } from "@primer/react";
import { TimelineModel } from "../../model";
import { observer } from "mobx-react-lite";
import './CondenseTimeline.scss';
import { formatDistanceToNow } from "date-fns";

interface CondenseTimelineProps {
  title: string;
  timeLine: Array<TimelineModel>;
  maxHeight?: number;
  textLength?: number;
  children?: React.ReactNode;
}
const CondenseTimelineComponent: React.FC<CondenseTimelineProps> = (props) => {
  const {
    title,
    children,
    timeLine,
    textLength = 900,
    maxHeight = 200,
  } = props;

  return (
    <Stack
      className='condense-timeline-container'
      style={{
        maxHeight: `${maxHeight}px`,
      }}
    >
      <Header>
        {title}
      </Header>
      <Button>
        Add Log
      </Button>
      {
        timeLine.map((time) => (
          <Timeline>
            <Timeline.Item
              condense
            >
              <Timeline.Badge>
                <Octicon
                  icon={time.icon}
                />
              </Timeline.Badge>

              <Timeline.Body>
                <Text
                  className='condense-timeline-date'
                >
                  {formatDistanceToNow(new Date(2022, 9, 10))}
                </Text>
                <br />
                {time.description}
              </Timeline.Body>

            </Timeline.Item>
          </Timeline>
        ))
      }
    </Stack>
  );
};

export const CondenseTimeline = observer(CondenseTimelineComponent);
