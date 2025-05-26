jest.mock("next/navigation");
jest.mock("swiper/react", () => {
  return {
    Swiper: jest.fn(),
    SwiperSlide: jest.fn(),
  };
});
jest.mock("swiper/modules", () => {
  return {
    Autoplay: jest.fn(),
  };
});
