// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

// 获取文章分类列表的处理函数
exports.getArtCates = (req, res) => {
  // 定义查询分类列表数据的 SQL 语句
  const sql = 'SELECT * FROM ev_article_cate WHERE is_delete = 0 ORDER BY id ASC'
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results,
    })
  })
}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  // 定义查重的 SQL 语句
  const sql = 'SELECT * FROM ev_article_cate WHERE name = ? OR alias = ?'
  // 执行查重的 SQL 语句
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    // 判断是否执行 SQL 语句失败
    if (err) return res.cc(err)

    // 判断数据的 length
    if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
    // length 等于 1 的三种情况
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    // 定义插入文章分类的 SQL 语句
    const sql = 'INSERT INTO ev_article_cate SET ?'
    // 执行插入文章分类的 SQL 语句
    db.query(sql, req.body, (err, results) => {

      // 判断是否执行 SQL 语句失败
      if (err) return res.cc(err)

      // 判断是否执行 SQL 语句失败
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')

      // 新增文章分类成功
      res.send({
        status: 0,
        message: '新增文章分类成功！',
      })
    })
  })
}

// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  // 定义标记删除的 SQL 语句
  const sql = 'UPDATE ev_article_cate SET is_delete = 1 WHERE id = ?'
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    res.cc('删除文章分类成功！', 0)
    })
}

// 根据 id 获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
  // 定义根据id获取文章分类的SQL语句
  const sql = 'SELECT * FROM ev_article_cate WHERE id = ?'
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取文章分类数据失败！')
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0],
    })
  })
}

// 根据 id 更新文章分类的处理函数
exports.updateCateById = (req, res) => {
  // 定义查重的SQL语句
  const sql = 'SELECT * FROM ev_article_cate WHERE id != ? AND (name = ? OR alias = ?)'
  // 调用 db.query() 执行查重的 SQL 语句
  db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    // 执行SQL语句失败
    if (err) return res.cc(err)
    
    // 判断名称和别名被占用的4种情况
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    // 定义更新文章分类的SQL语句
    const sql = 'UPDATE ev_article_cate SET ? WHERE Id = ?'
    // 执行更新文章分类的SQL语句
    db.query(sql, [req.body, req.body.Id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      res.cc('更新文章分类成功！', 0)
    })
  })
}