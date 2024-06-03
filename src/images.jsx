import { useEffect, useState } from "react";
import axios from "axios";

function Images() {
    const [mainImg, setImg] = useState(null);
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [img3, setImg3] = useState(null);
    const [img4, setImg4] = useState(null);
    const [img5, setImg5] = useState(null);
    const [img6, setImg6] = useState(null);
    const [img7, setImg7] = useState(null);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [gst, setGST] = useState("");
    const [mrp, setMRP] = useState("");
    const [productColor, setProductColor] = useState("");
    const [productGroup, setProductGroup] = useState("ShoeRack");
    const [productDescription, setProductDescription] = useState("");
    const [productWarranty, setProductWarranty] = useState("");
    const [productWarrantyNorms, setProductWarrantyNorms] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [otherId, setOtherId] = useState("");
    const [subGroup, setSubGroup] = useState("");
    const [material, setMaterial] = useState("");

    const handle = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append images
        formData.append("files", mainImg);
        formData.append("files", img1);
        formData.append("files", img2);
        formData.append("files", img3);
        formData.append("files", img4);
        formData.append("files", img5);
        formData.append("files", img6);
        formData.append("files", img7);

        // Add other form data to a dictionary
        const data = {
            "ProductName": productName,
            "ProductPrice": productPrice,
            "GST": gst,
            "MRP": mrp,
            "ProductColor": productColor,
            "ProductGroup": productGroup,
            "ProductDescripton": productDescription,
            "ProductWarranty": productWarranty,
            "ProductWarrantyNorms": productWarrantyNorms,
            "height": height,
            "width": width,
            "OtherId": otherId,
            "SubGroup":subGroup,
            "Material":material
        };

        // Append data to the formData
        for (const key in data) {
            formData.append(key, data[key]);
        }
        console.log(formData)
        try {
            await axios.post("http://localhost:3000/upload",formData)
            .then(res=>alert(res.data.message))
            .catch(err=>console.log(err))
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <form onSubmit={handle}>

                <div className="images-form">
                    <h1>Product Images!</h1>
                    <div className="mb-3">
                        <label htmlFor="main-img" className="form-label">Main Image</label>
                        <input type="file" className="form-control" name="main-img" id="main-img" onChange={e=>setImg(e.target.files[0])}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img-1" className="form-label">Image 1</label>
                        <input type="file" className="form-control" name="img-1" id="img-1" onChange={e=>setImg1(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img-2" className="form-label">Image 2</label>
                        <input type="file" className="form-control" name="img-2" id="img-2" onChange={e=>setImg2(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img-3" className="form-label">Image 3</label>
                        <input type="file" className="form-control" name="img-3" id="img-3" onChange={e=>setImg3(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img-4" className="form-label">Image 4</label>
                        <input type="file" className="form-control" name="img-4" id="img-4" onChange={e=>setImg4(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img-5" className="form-label">Image 5</label>
                        <input type="file" className="form-control" name="img-5" id="img-5" onChange={e=>setImg5(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img-6" className="form-label">Image 6</label>
                        <input type="file" className="form-control" name="img-6" id="img-6" onChange={e=>setImg6(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img-7" className="form-label">Image 7</label>
                        <input type="file" className="form-control" name="img-7" id="img-7" onChange={e=>setImg7(e.target.files[0])} />
                    </div>
                </div>
                <hr />

                <div className="product-details">
                    <h1>Product Main-Details</h1>
                    <div className="mb-3">
                        <label htmlFor="Product-Name" className="form-label">Product Name</label>
                        <input type="text" className="form-control" name="Product-Name" id="Product-Name" onChange={e=>setProductName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Product-Price" className="form-label">Product Price</label>
                        <input type="number" className="form-control" name="Product-Price" id="Product-Price" onChange={e=>setProductPrice(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="GST" className="form-label">GST</label>
                        <input type="number" className="form-control" name="GST" id="GST" onChange={e=>setGST(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="MRP" className="form-label">MRP</label>
                        <input type="number" className="form-control" name="MRP" id="MRP" onChange={e=>setMRP(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Product-Color" className="form-label">Product Color</label>
                        <input type="text" className="form-control" name="Product-Color" id="Product-Color" onChange={e=>setProductColor(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Product-Group" className="form-label">Product Group</label>
                        <select className="form-select" name="Product-Group" id="Product-Group" onChange={e=>setProductGroup(e.target.value)}>
                            <option value="ShoeRack">ShoeRack</option>
                            <option value="sofa">Sofa</option>
                        </select>
                    </div>
                </div>
                <hr />
<div className="product-spec">
                <h1>Product Specification</h1>
                <div className="mb-3">
                    <label htmlFor="Product-Description" className="form-label">Product Description</label>
                    <textarea className="form-control" name="Product-Description" id="Product-Description" cols="30" rows="10" onChange={e=>setProductDescription(e.target.value)}></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="Product-Warranty" className="form-label">Product Warranty</label>
                    <input type="number" className="form-control" name="Product-Warranty" id="Product-Warranty" onChange={e=>setProductWarranty(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="ProductMaterial" className="form-label">Product Material</label>
                    <input type="text" className="form-control" name="ProductMaterial" id="Product-Warranty" onChange={e=>setMaterial(e.target.value)} />
                </div>
                <div className="mb-3">
                        <label htmlFor="Product-Group" className="form-label">Product Sub-Group</label>
                        <select className="form-select" name="subGroup" id="" onChange={e=>setSubGroup(e.target.value)} >
                            <option value="Seat">Shoe Rack With Seat</option>
                            <option value="Cabinet">Shoe Cabinets</option>
                            <option value="Bench">Shoe Rack Bench</option>
                            <option value="regular">Regular</option> 
                            <option value="chaise-lounger">Chaise Lounger</option>
                            <option value="bench">bench</option>
                        </select>
                    </div>

                
                
                <div className="mb-3">
                    <label htmlFor="height" className="form-label">Height</label>
                    <input type="number" className="form-control" name="height" id="height" onChange={e=>setHeight(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="width" className="form-label">Width</label>
                    <input type="number" className="form-control" name="width" id="width" onChange={e=>setWidth(e.target.value)} />
                </div>
            </div>
            <hr />

            <div className="other-Id">
                <h1>Other ID</h1>
                <div className="mb-3">
                    <label htmlFor="Other-Id" className="form-label">Other ID</label>
                    <input type="text" className="form-control" name="Other-Id" id="Other-Id" onChange={e=>setOtherId(e.target.value)} />
                </div>
            </div>
            <hr />

            <button type="submit" className="btn btn-primary">POST</button>
        </form>
    </>
);
}

export default Images;
