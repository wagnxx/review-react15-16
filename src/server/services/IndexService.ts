class IndexService {
  getData() {
    return this.initData();
  }
  private initData() {
    return Promise.resolve('jcsck');
  }
}

export default IndexService;
