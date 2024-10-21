import { Octicon, Stack, Timeline, Text, Truncate, Header } from "@primer/react";
import { TimelineModel } from "../../model";
import { observer } from "mobx-react-lite";
import './CondenseTimeline.scss';

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
