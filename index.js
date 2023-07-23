/*БАЗА*/
let express = require(`express`);
const req = require("express/lib/request");
let app = express();
let port = 3000; 

app.use(express.static(`public`));

/*Настройка пост-запроса*/
app.use(express.urlencoded({extended: true}));

let hbs = require(`hbs`);
app.set(`views`, `views`);
app.set(`view engine`, `hbs`);
let moment = require(`moment`);
const fileUpload = require('express-fileupload');

/*Запуск сервера*/
app.listen(port, function() {
    console.log(`Поздравляю, твое дерьмо вроде работает`);
})
/*Работа с БД*/
let mongoose = require(`mongoose`);
mongoose.connect(`mongodb://127.0.0.1:27017/spg`)
let DZschema = new mongoose.Schema( {
    title: String,
    text: String,
    teacher: String,
    time: String,
    document: Buffer
}, { 
    timestamps: true 
}); 
let Homework = mongoose.model(`homework`, DZschema);

let QUschema = new mongoose.Schema({
    text: String,
    student: String,
    time: String,
    teacher: String,
    answer: String
}, { 
    timestamps: true 
});
let Question = mongoose.model(`question`, QUschema);

let docSchema = new mongoose.Schema( {
    title: String,
    time: String,
    way: String,
    teacher: String  
}, { 
    timestamps: true 
});
let Doc = mongoose.model('doc', docSchema);

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/upload/'
}));

/*УЧИТЕЛЯ*/
let users = {
        "Попов Константин": `cum`,
        "12": `12`,
        "Игорь Васильевич": `1234`
    };

/*Роуты*/ 
app.get(`/`, function(req, res){
    res.render(`index`);
});
app.post(`/home`, function(req, res) {
    let name = req.body.name;
    let pass = req.body.pass; 
    let isStudent = req.body.who;  
    if (isStudent == `true`) {
        res.render(`home`, {
            name: name
        })
    }
    else {
        if (!name || !pass) {
            res.redirect(`/`)
        }
        else {
            let rigthPass = users[name];
            if (rigthPass == pass) {
                res.render(`TEA/homeTEA`, {
                    name: name
                });            
            }
            else {
                res.redirect(`/`);
            }
        }
    }
});


app.get(`/dz`, async function(req, res) {
    try {
        let searchTea = req.query.teacher;
        let searchTit = req.query.title;
        if (!searchTea && !searchTit) {
            let homework = await Homework.find()
            .sort({
                createdAt: -1
            });
            res.render(`dz`, {
                homework: homework
            });
        }
        else if (searchTea && !searchTit) {
            let homework = await Homework.find({
                teacher: searchTea
            })
            .sort({
                createdAt: -1
            });
            res.render(`dz`, {
                homework: homework
            });
        }
        else if (searchTit && !searchTea) {
            let homework = await Homework.find({
                title: searchTit
            })
            .sort({
                createdAt: -1
            });
            res.render(`dz`, {
                homework: homework
            });
        }
        else {
            let homework = await Homework.find({
                title: searchTit,
                teacher: searchTea
            })
            .sort({
                createdAt: -1
            });
            res.render(`dz`, {
                homework: homework
            });
        }
        
    } catch (error) {
        res.render(`error`)
    }
});
app.get(`/materials`, async function(req, res) {
    let materials = await Doc.find().sort({ 
        createdAt: -1
    })
    res.render(`materials`, {
        materials: materials
    });
});
app.get(`/questions`, async function(req, res) {
    let search = req.query.search;
    try {
        if (!search) {
            let questions = await Question.find().sort({
                createdAt: -1});
            res.render(`questions`, {
                questions: questions
            });
        }
        else {
            let searchL = search.toLowerCase();
            let questions = await Question.find().sort({
                createdAt: -1});
            let questionSearch = [];
            for (let i = 0; i < questions.length; i++) {
                let item = questions[i];
                let itemText = item.text.toLowerCase();
                if (itemText.includes(searchL)) {
                    questionSearch.push(item);
                }
            }
            res.render(`questions`, {
                questions: questionSearch,
                search: search
            });
        }
    } catch(error) {
        res.render(`error`);
    }
});
app.get(`/question`, async function(req, res) {
    let id = req.query.id
    try {
        let question = await Question.findOne({
            _id: id
        });
        res.render(`question`, {
            question: question
        })
    } catch(error) {
        res.render(`error`);
    }
})
app.get(`/about`, function(req, res) {
    res.render(`about`);
});


/*учительские роуты*/

app.get(`/dzTEA`, async function(req, res) {
    try {
        let searchTea = req.query.teacher;
        let searchTit = req.query.title;
        if (!searchTea && !searchTit) {
            let homework = await Homework.find()
            .sort({
                createdAt: -1
            });
            res.render(`TEA/dzTEA`, {
                homework: homework
            });
        }
        else if (searchTea && !searchTit) {
            let homework = await Homework.find({
                teacher: searchTea
            })
            .sort({
                createdAt: -1
            });
            res.render(`TEA/dzTEA`, {
                homework: homework
            });
        }
        else if (searchTit && !searchTea) {
            let homework = await Homework.find({
                title: searchTit
            })
            .sort({
                createdAt: -1
            });
            res.render(`TEA/dzTEA`, {
                homework: homework
            });
        }
        else {
            let homework = await Homework.find({
                title: searchTit,
                teacher: searchTea
            })
            .sort({
                createdAt: -1
            });
            res.render(`TEA/dzTEA`, {
                homework: homework
            });
        }
        
    } catch (error) {
        res.render(`error`)
    }
});
app.get(`/materialsTEA`, async function(req, res) {
    let name = req.query.tea;
    let materials = await Doc.find().sort({
        createdAt: -1
    })
    res.render(`TEA/materialsTEA`, {
        name: name,
        materials: materials
    })
});
app.get(`/questionsTEA`, async function(req, res) {
    let search = req.query.search;
    let name = req.query.tea;
    try {
        if (!search) {
            let questions = await Question.find().sort({
                createdAt: -1});
            res.render(`TEA/questionsTEA`, {
                questions: questions
            });
        }
        else {
            let searchL = search.toLowerCase();
            let questions = await Question.find().sort({
                createdAt: -1});
            let questionSearch = [];
            for (let i = 0; i < questions.length; i++) {
                let item = questions[i];
                let itemText = item.text.toLowerCase();
                if (itemText.includes(searchL)) {
                    questionSearch.push(item);
                }
            }
            res.render(`TEA/questionsTEA`, {
                questions: questionSearch,
                search: search,
                name: name
            });
        }
    } catch(error) {
        res.render(`error`);
    }
});
app.get(`/questionTEA`, async function(req, res) {
    let id = req.query.id;
    try {
        let question = await Question.findOne({
            _id: id
        });

        res.render(`TEA/questionTEA`, {
            question: question
        });
    } catch(error) {
        res.render(`error`);
    }
})
app.get(`/aboutTEA`, function(req, res) {
    res.render(`TEA/aboutTEA`)
});

/*Работа с БД*/
app.post(`/dz_update`, async function(req, res) {
    let title = req.body.title;
    let text = req.body.text;
    let name = req.body.teacher;
    let date = new Date();
    let time = String(date.getHours() + `:` + (("0" + date.getMinutes()).slice(-2)) + ` ` + (("0" + date.getDate()).slice(-2)) + `.`+ String(("0" + (date.getMonth()+1)).slice(-2)) + `.`+ date.getFullYear());
    try {
        if (title && text && name) {
            let hometask = new Homework({
                title: title,
                text: text,
                teacher: name,
                time: time
            });
            await hometask.save();
        }
    res.redirect(`/dzTEA`);
    } catch(error) {
        res.render(`error`);
    }
})
app.get(`/dz_delete`, async function(req, res) {
    let id = req.query.id;
    try {
        await Homework.deleteOne({
            _id: id
        })
        res.redirect(`/dzTEA`)
    } catch(error) {
        res.render(`error`);
    }
})

app.post(`/question_update`, async function(req, res) {
    let teacher = req.body.teacher;
    let text = req.body.text;
    let date = new Date();
    let time = String(date.getHours() + `:` + (("0" + date.getMinutes()).slice(-2)) + ` ` + (("0" + date.getDate()).slice(-2)) + `.`+ String(("0" + (date.getMonth()+1)).slice(-2)) + `.`+ date.getFullYear());
    let student = req.body.student;
    if (teacher!=`Выберите учителя:` && text) {
        if (!student) {
            student = `Анонимный котеночек`;
        }
        let ques = new Question( {
            text: text,
            time: time,
            student: student,
            teacher: teacher
        })
        await ques.save();
    }
    res.redirect('/questions');
})
app.get(`/question_delete`, async function(req, res) {
    let id = req.query.id;
    try {
        await Question.deleteOne({
            _id: id
        })
        res.redirect(`/questionsTEA`)
    } catch(error) {
        res.render(`error`);
    }
});
app.post(`/answer`, async function(req, res) {
    let id = req.query.id;
    let answer = req.body.answer;
    let tea = req.body.teacher;
    try {
        await Question.updateOne({
            _id: id
        }, {
            $set: {
                answer: answer
            }
        });
        res.redirect(`/questionTEA?id=`+id);
    }
    catch(error) {
        res.render(`error`);
    }

});
app.post(`/material`, async function(req, res) {
    let file = req.files.file;     
    let date = new Date();
    let tea = req.body.teacher;
    let tit = req.body.title;
    let time = String(date.getHours() + `:` + (("0" + date.getMinutes()).slice(-2)) + ` ` + (("0" + date.getDate()).slice(-2)) + `.`+ String(("0" + (date.getMonth()+1)).slice(-2)) + `.`+ date.getFullYear());
    let way = __dirname + `/public/upload/` + file.name;
    let item = new Doc({
        title: tit, 
        way: `upload/` + file.name,
        time: time,
        teacher: tea
    })
    await item.save();
    file.mv(way);
    res.redirect(`/materialsTEA`);
})
app.get(`/delete_mat`, async function(req, res) {
    let id = req.query.id;
    try {
        await Doc.deleteOne({
            _id: id
        })
        res.redirect(`/materialsTEA`)
    } catch(error) {
        res.render(`error`);
    }
})