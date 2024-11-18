import { Box, Stack, SubNav, Text } from "@primer/react";
import { Project } from "../../../model/generated/project";
import './project-swiper-card.scss';
import { ImageViewer } from "../ImageViewer";
import { defineRSJFForm } from "../../rsjf-primer/Utils";
import { BasicWidgetSchemaType } from "../../rsjf-primer/RJSFCustomTypes";
import { format } from "date-fns";

interface ProjectSwiperCardProps {
  model: Project
}

export const ProjectSwiperCardComponent = ({
  model
}: ProjectSwiperCardProps) => {
  const propertiesForm = defineRSJFForm<Project>({
    schema: {
      type: "object",
      properties: {
        name: {
          type: BasicWidgetSchemaType.String,
          default: model.name,
          readonly: true,
        },
        imageUrl: {
          type: BasicWidgetSchemaType.String,
          readonly: true,
          default: model.imageUrl
        },
        createdDate: {
          type: BasicWidgetSchemaType.String,
          readonly: true,
          format: 'date',
          default: format(model.createdDate, 'yyyy-MM-d')
        },
        deadLineDate: {
          type: BasicWidgetSchemaType.String,
          readonly: true,
          format: 'date',
          default: format(model.deadLineDate, 'yyyy-MM-d')
        },
        lastUpdatedDate: {
          type: BasicWidgetSchemaType.String,
          readonly: true,
          format: 'date',
          default: format(model.lastUpdatedDate, 'yyyy-MM-d')
        },
        finishedDate: {
          type: BasicWidgetSchemaType.String,
          readonly: true,
          format: 'date',
          default: format(model.finishedDate, 'yyyy-MM-d')
        },
        sellPrice: {
          type: BasicWidgetSchemaType.Integer,
          readonly: true,
          default: model.sellPrice.toString()
        },
        capital: {
          type: BasicWidgetSchemaType.Integer,
          readonly: true,
          default: model.capital.toString()
        },
        fail: {
          type: BasicWidgetSchemaType.Boolean,
          readonly: true,
          default: model.fail
        },
        finish: {
          type: BasicWidgetSchemaType.Boolean,
          readonly: true,
          default: model.finish
        },
        profitInPersen: {
          type: BasicWidgetSchemaType.Integer,
          readonly: true,
          default: model.profitInPersen
        },
        description: {
          type: BasicWidgetSchemaType.String,
          readonly: true,
          default: model.description
        },
      }
    },
    uiSchema: {
      "ui:submitButtonOptions": { norender: true },
      description: {
        'ui:widget': 'textarea'
      }
    },
    onSubmit: (data) => console.log(data)
  });
  return (
    <Box
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: '15px',
        p: 4
      }}
      className='box-project-swiper-card'
    >
      <Stack
        direction='horizontal'
      >
        <Stack>
          <Stack.Item>
            <Text
              as='h3'
              weight='medium'
              sx={{
                marginBottom: '0'
              }}
            >
              {model.name}
            </Text>
            <Text>
              {model.description.slice(0, 60)}
            </Text>
          </Stack.Item>
          <Stack.Item
            className='project-image'
          >
            <ImageViewer
              imageUrl='https://picsum.photos/600/400'
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Stack.Item>
        </Stack>

        <Stack
          className='right-side'
          align='center'
        >
          <SubNav aria-label="Main">
            <SubNav.Links>
              <SubNav.Link href="#home" selected>
                Properties
              </SubNav.Link>

              <SubNav.Link href="#documentation">
                Statistic
              </SubNav.Link>

              <SubNav.Link href="#support">
                Notes
              </SubNav.Link>
            </SubNav.Links>
          </SubNav>

          <Stack.Item>
            {propertiesForm}
          </Stack.Item>
        </Stack>

      </Stack>
    </Box>
  );
};

