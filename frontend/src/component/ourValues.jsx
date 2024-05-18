import React from "react";

function Values() {
    return (
        <div className="flex flex-col flex-wrap justify-center items-center">
            <div>
                <h1 className="text-4xl p-8">
                    Our Values
                </h1>
            </div>
            <div>
                <div className="carousel carousel-center m-4 p-4 space-x-4 bg-neutral rounded-box">
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="rounded-box" />
                    </div>
                    <div className="carousel-item text-white text-3xl font-mono flex flex-wrap w-1/5 rounded-lg bg-yellow-800">
                        In a world often overshadowed by discord and division, the essence of humanity thrives in the profound concep
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Values;