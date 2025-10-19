jest.mock("next/navigation", () => ({
  useServerInsertedHTML: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

jest.mock("swiper/react", () => ({
  Swiper: jest.fn(),
  SwiperSlide: jest.fn(),
}));

jest.mock("swiper/modules", () => ({
  Autoplay: jest.fn(),
}));
