/**
 * @file script.ts
 * @brief Implementa a lógica do carrossel de comunicados para a Página Inicial.
 *
 * Este script controla a exibição do slide atual, permitindo navegação através dos botões "Anterior" e "Próximo".
 */

/**
 * @interface Slide
 * @brief Define a estrutura dos dados de um slide do carrossel.
 */
interface Slide {
    imageUrl: string;  // URL da imagem do slide
    title: string;     // Título curto do comunicado
    subtitle: string;  // Subtítulo ou descrição breve
  }
  
  /**
   * @class Carousel
   * @brief Gerencia o carrossel de slides.
   */
  class Carousel {
    private slides: Slide[];
    private currentIndex: number;
    private carouselContainer: HTMLElement;
  
    /**
     * @brief Construtor da classe Carousel.
     * @param slides Array de slides a serem exibidos.
     * @param containerId ID do elemento HTML onde o carrossel será renderizado.
     */
    constructor(slides: Slide[], containerId: string) {
      this.slides = slides;
      this.currentIndex = 0;
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`Elemento com ID '${containerId}' não encontrado.`);
      }
      this.carouselContainer = container;
      this.renderSlide();
    }
  
    /**
     * @brief Renderiza o slide atual no container.
     */
    renderSlide(): void {
      const slide = this.slides[this.currentIndex];
      this.carouselContainer.innerHTML = `
        <div class="slide">
          <img src="${slide.imageUrl}" alt="${slide.title}" class="slide-image">
          <div class="slide-info">
            <h2 class="slide-title">${slide.title}</h2>
            <p class="slide-subtitle">${slide.subtitle}</p>
          </div>
        </div>
      `;
    }
  
    /**
     * @brief Avança para o próximo slide.
     */
    nextSlide(): void {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.renderSlide();
    }
  
    /**
     * @brief Volta para o slide anterior.
     */
    prevSlide(): void {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.renderSlide();
    }
  }
  
  // Dados de exemplo para os slides
  const slidesData: Slide[] = [
    {
      imageUrl: 'images/evento1.jpg',
      title: 'Workshop de IA',
      subtitle: 'Participe do nosso workshop sobre Inteligência Artificial.',
    },
    {
      imageUrl: 'images/evento2.jpg',
      title: 'Semana Acadêmica',
      subtitle: 'Confira as atividades da semana acadêmica da Informática UFSM.',
    },
    {
      imageUrl: 'images/evento3.jpg',
      title: 'Hackathon UFSM',
      subtitle: 'Inscreva-se e mostre suas habilidades em programação.',
    },
  ];
  
  /**
   * @brief Inicializa o carrossel e configura os botões de navegação ao carregar o DOM.
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Instancia o carrossel dentro do elemento com ID "carousel"
    const carousel = new Carousel(slidesData, 'carousel');
  
    // Configura os botões "Próximo" e "Anterior"
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
  
    if (nextBtn) {
      nextBtn.addEventListener('click', () => carousel.nextSlide());
    }
  
    if (prevBtn) {
      prevBtn.addEventListener('click', () => carousel.prevSlide());
    }
  });
  