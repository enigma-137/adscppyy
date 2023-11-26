"use client"
import axios from 'axios';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import OpenAI from 'openai';
import { CopyIcon } from 'lucide-react';


// Main ad generator function
const AdCopyGenerator = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [loading, setLoading] = useState(false);

  // copy generator
  const generateAdCopy = async () => {
    setLoading(true);

    try {
      const response = await axios.post('/page/api', {
        productName,
        productDescription,
      });

      console.log(response.data)

      const adCopy = response.data.adCopy;

      setGeneratedCopy(adCopy);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white p-8 border shadow-lg  rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-black text-center">Ad Copy <span className='bg-purple-200'> Generator</span></h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
          <input
            type="text"
            placeholder='Creamy Puff pastry'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border text-black rounded-md py-2 px-3 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Description</label>
          <input
            type="text"
            placeholder='Puff puff with milk toppings Oreos crunchies wafer chocolate ganache sprinkles and popsicle'
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-black focus:outline-none  focus:border-purple-500"
          />
        </div>

        <button
          onClick={generateAdCopy}
          className="bg-purple-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple"
        >
          {(loading && generatedCopy.length < 1) ? 'Generating...' : generatedCopy.length > 1 ? 'Regenerate' : 'Generate' }
          
        </button>

        {(generatedCopy && !loading) && (

          <div className='mt-4'>
            <div className="mt-4 rounded-md bg-slate-100 border p-3 flex">
              <div className="flex items-center mb-2">

                <span className="m-2">{generatedCopy}</span>

              </div>
            </div>
            <CopyToClipboard text={generatedCopy}>
              <button className="bg-purple-600 text-white py-1 px-2 hover:bg-purple-600 focus:outline-none focus:shadow-outline-green">
                <CopyIcon className='h-4 w-4' />
              </button>
            </CopyToClipboard>
          </div>

        )}

        {loading && (
          <div className="mt-4">
            <img
              src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
              alt="Loading"
              className="mx-auto"
            />
          </div>
        )}
      </div>

      <div className=" border-t pt-4">
        <p className="text-white-500  text-sm text-center">
          An Experimental Ai Powered ads-Copy-Generator by <a href='https://twitter.com/enigma137x' className='font-bold text-purple-500'>Enigma</a>
        </p>
      </div>
    </div>


  );
};

export default AdCopyGenerator;
