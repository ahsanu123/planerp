import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Project } from '../../model/generated/project';
import { ProjectSwiperCardComponent } from './swiper-card/project-swiper-card';

interface SliderComponentProps<T> {
  model: T[],
  swiperClassName?: string,
  onSlideChange: (swiper: SwiperClass) => void,
  onRender: (model: T) => JSX.Element,
  onSwiper: (swiper: SwiperClass) => void,
}

export const SliderComponent = <T,>(props: SliderComponentProps<T>) => {
  const {
    model,
    swiperClassName,
    onSwiper,
    onRender,
    onSlideChange,
  } = props;
  return (
    <Swiper
      className={swiperClassName}
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={onSlideChange}
      navigation
      onSwiper={onSwiper}
    >
      {
        model.map((model, index) => (
          <SwiperSlide
            key={index}
          >
            {onRender(model)}
          </SwiperSlide>
        ))
      }
    </Swiper>
  );

};

const listImage: string[] = [
  'https://raw.githubusercontent.com/ahsanu123/sudi-keyboard/sudi-v2/pcb-design/output/Regirock_GIF.gif',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/seed/picsum/200/300',
];

const MOCK_PROJECTS: Project[] = [
  {
    name: "Tofu Control Panel Automation",
    deadLineDate: new Date(2024, 11),
    lastUpdatedDate: new Date(),
    finishedDate: new Date(),
    capital: 1000,
    description: "upgrade factory machinery with new technology",
    id: 0,
    imageUrl: "",
    createdDate: new Date(),
    sellPrice: 110,
    fail: false,
    finish: false,
    profitInPersen: 120
  },
  {
    name: "Sudi Keyboard V2 - Split Keyboard",
    deadLineDate: new Date(2024, 11),
    lastUpdatedDate: new Date(),
    finishedDate: new Date(),
    capital: 1000,
    description: "upgrade factory machinery with new technology",
    id: 0,
    imageUrl: "",
    createdDate: new Date(),
    sellPrice: 0,
    fail: false,
    finish: false,
    profitInPersen: 0
  },
];

export const ImageSliderMock: React.FC = () => {

  return (
    <SliderComponent
      model={MOCK_PROJECTS}
      onSwiper={(swipe) => console.log(swipe)}
      onSlideChange={(swiper) => console.log(swiper)}
      onRender={(model) => (
        <ProjectSwiperCardComponent
          model={model}
        />
      )}
    />
  );
};
