export const ImageView = {
  get image() {
    cy.log('Get main image');
    return cy
      .get('img[alt=LS]');
  },
  get root() {
    return this.image
      .closest('.lsf-object');
  },
  get drawingArea() {
    cy.log('Get Konva.js root');
    return this.image
      .closest('[class^="frame--"]')
      .siblings()
      .get('[class^="image-element--"] .konvajs-content');
  },
  get pagination() {
    return this.root
      .get('[class^="pagination--"]');
  },
  get paginationPrevBtn() {
    return this.pagination
      .get('.lsf-pagination__btn_arrow-left:not(.lsf-pagination__btn_arrow-left-double)');
  },
  get paginationNextBtn() {
    return this.pagination
      .get('.lsf-pagination__btn_arrow-right:not(.lsf-pagination__btn_arrow-right-double)');
  },
  waitForImage() {
    cy.log('Make sure that the image is visible and loaded');
    this.image
      .should('be.visible')
      .and((img) => {
        return expect((img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0); 
      });

    this.drawingArea
      .get('canvas')
      .should('be.visible');
  },
  drawRect(x: number, y: number, width: number, height: number) {
    cy.log(`Draw rectangle at (${x}, ${y}) of size ${width}x${height}`);
    this.drawingArea
      .scrollIntoView()
      .trigger('mousedown', x, y, { eventConstructor: 'MouseEvent' })
      .trigger('mousemove', x + width, y + height, { eventConstructor: 'MouseEvent' })
      .trigger('mouseup', { eventConstructor: 'MouseEvent' });
  },
  /**
   * Captures a screenshot of an element to compare later
   * @param {string} name name of the screenshot
   */
  capture(name: string) {
    return this.drawingArea.captureScreenshot(name);
  },

  /**
   * Captures a new screenshot and compares it to already taken one
   * Fails if screenshots are identical
   * @param name name of the screenshot
   * @param treshold to compare image. It's a relation between original number of pixels vs changed number of pixels
   */
  canvasShouldChange(name: string, treshold = 0.1) {
    return this.drawingArea.compareScreenshot(name, 'shouldChange', { treshold });
  },

  /**
   * Captures a new screenshot and compares it to already taken one
   * Fails if screenshots are different
   * @param name name of the screenshot
   * @param treshold to compare image. It's a relation between original number of pixels vs changed number of pixels
   */
  canvasShouldNotChange(name: string, treshold = 0.1) {
    return this.drawingArea.compareScreenshot(name, 'shouldNotChange', { treshold });
  },
};
