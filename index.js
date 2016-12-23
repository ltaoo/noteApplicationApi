#!/usr/bin/env node
const fs = require('fs');
const program = require('commander')
// 获取执行命令的目录
const path = process.cwd();

const Evernote = require('./src/Evernote');

// 初始化一些默认的信息
program
  //版本信息
  .version('0.1.0')
  // 配置项
  //.option('-n, --create [value]', '将笔记上传至印象笔记')

// 命令
program
  .command('create <file>')
  .description('新建笔记到印象笔记')
  .action((path)=> {
    //
    Evernote.createNote(path);
  });


// 更新指定笔记
program.command('update <file>')
    .description('更新指定笔记')
    .action(path => {
        Evernote.updateNote(path);
    });

program.command('init')
  .description('初始化应用，初始化后如需要同步印象笔记，使用 clone')
  .action(() => {
    // 初始化就是在本地初始化 note 文件夹和 db.json 数据库
  })

program.command('clone')
	.description('第一次使用时执行，从印象笔记获取所有笔记')
	.action(() => {
        // 如果是初始化，表示是重新来，所以先将所有文件删除掉，包括数据库。
        // delete all file
		Evernote.fetchNotebookList()
            .then(res => {
                // 如果笔记本对应的文件夹都创建好了，就可以去获取笔记了
                return Evernote.fetchNoteList();
            })
            .catch(err => {
                console.log(err);
            })
            .then(res => {
                console.log('初始化成功！');
            })
            .catch(err => {
                console.log(err);
            })
	});



program
    .command('push')
    .description('将所有修改提交至印象笔记，类似 git 的 push')
    .action(() => {
        // 遍历文件夹，比对，性能很有问题。。。
    })


program.command('pull')
  .description('从印象笔记拉取更新，类似 git 的 pull')
  .action(() => {
    // 从印象笔记下载指定笔记

  })

program.parse(process.argv);

// console.log(program)
// 根据命令来进行处理
// if(program.create) {
//   // 如果是 create 参数
//   console.log('新建笔记');
// } else {
//   console.log('显示 help');
// }
