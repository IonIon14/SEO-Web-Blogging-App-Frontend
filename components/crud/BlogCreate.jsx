import Link from "next/link"
import { useState, useEffect } from "react"
import Router from "next/dist/server/router"
import dynamic from "next/dynamic"
import { withRouter } from "next/router"
import { getCookie, isAuth } from "../../actions/auth"
import { getCategories } from "../../actions/category"
import { getTags } from "../../actions/tag"
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import "../../node_modules/react-quill/dist/quill.snow.css"
import { QuillModules, QuillFormats } from "../../helpers/quill"

const BlogCreate = ({ router }) => {

    const blogFromLocalStorage = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'))
        } else {
            return false;
        }
    }

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checkedCategories, setCheckedCategories] = useState([]); //categories
    const [checkedTag, setCheckedTag] = useState([]); //categories

    const [body, setBody] = useState(blogFromLocalStorage());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })

    const { error, sizeError, success, formData, title, hidePublishButton } = values
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        loadCategories();
        loadTags()
    }, [router])

    const loadCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setCategories(data);
            }
        })
    }

    const loadTags = () => {
        getTags().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setTags(data);
            }
        })

    }

    const publishBlog = (e) => {
        e.preventDefault();
        console.log('Token:', token)
        createBlog(formData, token).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({ ...values, title: '', error: '', success: `A new blog titled "${data.title}" is created!` })
                setBody('');
                setCategories([]);
                setTags([]);
            }
        })
    }


    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        console.log("value:", value)
        setValues({ ...values, [name]: value, formData, error: '' })

    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const handleToggleCategory = (id) => () => {
        setValues({ ...values, error: "" });

        // return the first index or -1 
        const clickedCategory = checkedCategories.indexOf(id)
        const all = [...checkedCategories]
        if (clickedCategory === -1) {
            all.push(id)
        }
        else {
            all.splice(clickedCategory, 1)
        }
        console.log(all);
        setCheckedCategories(all);
        formData.set('categories', all)
    }

    const handleToggleTag = (id) => () => {
        setValues({ ...values, error: "" });

        // return the first index or -1 
        const clickedTag = checkedTag.indexOf(id)
        const all = [...checkedTag]
        if (clickedTag === -1) {
            all.push(id)
        }
        else {
            all.splice(clickedTag, 1)
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all)
    }

    const showCategories = () => {
        return (
            categories && categories.map((category, index) => (
                <li key={index} className="list-unstyled">
                    <input onChange={handleToggleCategory(category._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{category.name}</label>
                </li>
            ))
        )
    }

    const showTags = () => {
        return (
            tags && tags.map((tag, index) => (
                <li key={index} className="list-unstyled">
                    <input type="checkbox" onChange={handleToggleTag(tag._id)} className="mr-2" />
                    <label className="form-check-label">{tag.name}</label>
                </li>
            ))
        )
    }

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
        )
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>{success}</div>
        )

    }

    const createBlogForm = () => {

        return (
            <>
                <form onSubmit={publishBlog}>
                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                    </div>

                    <div className="form-group">
                        <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder="Write something amazing..." onChange={handleBody} />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary">Publish</button>
                    </div>
                </form>
            </>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <h2>Create Blog Form</h2>
                    {createBlogForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="feature-image-div">
                        <div className="form-group pb-2 ">
                            <h5>Featured image</h5>
                            <hr />
                            <small className="text-muted mr-2">Max size allowed: 1MB</small>
                            <label className="btn btn-outline-info">
                                Upload featured image
                                <input type="file" className="" onChange={handleChange('photo')} accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h5>Categories</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
                    <div className="mt-2">
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div >
    )
}



export default withRouter(BlogCreate);