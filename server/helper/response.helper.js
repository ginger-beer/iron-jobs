module.exports = function responseHelper(data) {
  return {id: data.id, company: data.company, link: data.link, notes: data.notes, createTime: data.createTime};
};
