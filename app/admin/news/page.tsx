"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminNewsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [newsList, setNewsList] = useState<any[]>([]);

  // 1. جلب الأخبار الموجودة عشان تقدر تمسحها
 useEffect(() => {
  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login"); // لو مفيش جلسة دخول مسجلة، اطرده لصفحة اللوجين
    }
  };
  checkUser();
  fetchNews();
}, []);

  // 2. وظيفة رفع الصورة
  async function handleFileUpload(event: any) {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // الحصول على رابط الصورة
      const { data } = supabase.storage.from('news-images').getPublicUrl(filePath);
      return data.publicUrl;

    } catch (error) {
      alert('Error uploading image!');
    } finally {
      setUploading(false);
    }
  }

  // 3. إضافة الخبر بالكامل
  async function addNews(e: any) {
    const file = e.target.form[2].files[0]; // الوصول لملف الصورة من الفورم
    let imageUrl = "";
    
    if (file) {
      imageUrl = await handleFileUpload({ target: { files: [file] } }) || "";
    }

    const { error } = await supabase.from("news").insert([{ title, description, image: imageUrl }]);

    if (!error) {
      alert("تمت الإضافة بنجاح!");
      setTitle(""); setDescription("");
      fetchNews();
    }    {
      "name": "insert_edit_into_file",
      "arguments": {
        "filePath": "H:\\rma-federation\\app\\about\\page.tsx",
        "contentToInsert": `
    import React from 'react';
    import { motion } from 'framer-motion';
    
    const AboutPage: React.FC = () => {
      return (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>About RMA</h1>
          <p>Real Martial Art is a martial arts and self-defense coaching company founded by Tarek Vandam.</p>
          <section>
            <h2>Founder Information</h2>
            <ul>
              <li><strong>Name:</strong> Tarek Vandam</li>
              <li><strong>Role:</strong> Founder of RMA (Real Martial Art)</li>
              <li><strong>Background:</strong>
                - Martial arts and self-defense coach
                - Official representative of Hapkido in Egypt
                - MMA coach
                - Kyokushin Karate practitioner
                - Certified in CPR and BLS
                - Sports training diploma
                - Nutrition diploma
                - Creator of realistic combat awareness content
              </li>
            </ul>
          </section>
          <section>
            <h2>RMA Philosophy</h2>
            <p>Real Martial Art is dedicated to providing a realistic combat experience, exposing fake martial arts myths, and promoting self-defense. The company emphasizes discipline, personal transformation, and real fighting vs fantasy.</p>
          </section>
          <section>
            <h2>Achievements</h2>
            <ul>
              <li><strong>Facebook Followers:</strong> 60K+</li>
              <li><strong>YouTube Subscribers:</strong> 60K+</li>
              <li><strong>Views:</strong> 16M+</li>
              <li><strong>Martial Arts Certifications:</strong> International martial arts certifications</li>
              <li><strong>International Events Participation:</strong> Participation in international events</li>
            </ul>
          </section>
        </motion.div>
      );
    };
    
    export default AboutPage;
    `
    }    {
      "name": "insert_edit_into_file",
      "arguments": {
        "filePath": "H:\\rma-federation\\app\\about\\page.tsx",
        "contentToInsert": `
    import React from 'react';
    import { motion } from 'framer-motion';
    
    const AboutPage: React.FC = () => {
      return (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>About RMA</h1>
          <p>Real Martial Art is a martial arts and self-defense coaching company founded by Tarek Vandam.</p>
          <section>
            <h2>Founder Information</h2>
            <ul>
              <li><strong>Name:</strong> Tarek Vandam</li>
              <li><strong>Role:</strong> Founder of RMA (Real Martial Art)</li>
              <li><strong>Background:</strong>
                - Martial arts and self-defense coach
                - Official representative of Hapkido in Egypt
                - MMA coach
                - Kyokushin Karate practitioner
                - Certified in CPR and BLS
                - Sports training diploma
                - Nutrition diploma
                - Creator of realistic combat awareness content
              </li>
            </ul>
          </section>
          <section>
            <h2>RMA Philosophy</h2>
            <p>Real Martial Art is dedicated to providing a realistic combat experience, exposing fake martial arts myths, and promoting self-defense. The company emphasizes discipline, personal transformation, and real fighting vs fantasy.</p>
          </section>
          <section>
            <h2>Achievements</h2>
            <ul>
              <li><strong>Facebook Followers:</strong> 60K+</li>
              <li><strong>YouTube Subscribers:</strong> 60K+</li>
              <li><strong>Views:</strong> 16M+</li>
              <li><strong>Martial Arts Certifications:</strong> International martial arts certifications</li>
              <li><strong>International Events Participation:</strong> Participation in international events</li>
            </ul>
          </section>
        </motion.div>
      );
    };
    
    export default AboutPage;
    `
    }    {
      "name": "insert_edit_into_file",
      "arguments": {
        "filePath": "H:\\rma-federation\\app\\about\\page.tsx",
        "contentToInsert": `
    import React from 'react';
    import { motion } from 'framer-motion';
    
    const AboutPage: React.FC = () => {
      return (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>About RMA</h1>
          <p>Real Martial Art is a martial arts and self-defense coaching company founded by Tarek Vandam.</p>
          <section>
            <h2>Founder Information</h2>
            <ul>
              <li><strong>Name:</strong> Tarek Vandam</li>
              <li><strong>Role:</strong> Founder of RMA (Real Martial Art)</li>
              <li><strong>Background:</strong>
                - Martial arts and self-defense coach
                - Official representative of Hapkido in Egypt
                - MMA coach
                - Kyokushin Karate practitioner
                - Certified in CPR and BLS
                - Sports training diploma
                - Nutrition diploma
                - Creator of realistic combat awareness content
              </li>
            </ul>
          </section>
          <section>
            <h2>RMA Philosophy</h2>
            <p>Real Martial Art is dedicated to providing a realistic combat experience, exposing fake martial arts myths, and promoting self-defense. The company emphasizes discipline, personal transformation, and real fighting vs fantasy.</p>
          </section>
          <section>
            <h2>Achievements</h2>
            <ul>
              <li><strong>Facebook Followers:</strong> 60K+</li>
              <li><strong>YouTube Subscribers:</strong> 60K+</li>
              <li><strong>Views:</strong> 16M+</li>
              <li><strong>Martial Arts Certifications:</strong> International martial arts certifications</li>
              <li><strong>International Events Participation:</strong> Participation in international events</li>
            </ul>
          </section>
        </motion.div>
      );
    };
    
    export default AboutPage;
    `
    }    {
      "name": "insert_edit_into_file",
      "arguments": {
        "filePath": "H:\\rma-federation\\app\\about\\page.tsx",
        "contentToInsert": `
    import React from 'react';
    import { motion } from 'framer-motion';
    
    const AboutPage: React.FC = () => {
      return (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>About RMA</h1>
          <p>Real Martial Art is a martial arts and self-defense coaching company founded by Tarek Vandam.</p>
          <section>
            <h2>Founder Information</h2>
            <ul>
              <li><strong>Name:</strong> Tarek Vandam</li>
              <li><strong>Role:</strong> Founder of RMA (Real Martial Art)</li>
              <li><strong>Background:</strong>
                - Martial arts and self-defense coach
                - Official representative of Hapkido in Egypt
                - MMA coach
                - Kyokushin Karate practitioner
                - Certified in CPR and BLS
                - Sports training diploma
                - Nutrition diploma
                - Creator of realistic combat awareness content
              </li>
            </ul>
          </section>
          <section>
            <h2>RMA Philosophy</h2>
            <p>Real Martial Art is dedicated to providing a realistic combat experience, exposing fake martial arts myths, and promoting self-defense. The company emphasizes discipline, personal transformation, and real fighting vs fantasy.</p>
          </section>
          <section>
            <h2>Achievements</h2>
            <ul>
              <li><strong>Facebook Followers:</strong> 60K+</li>
              <li><strong>YouTube Subscribers:</strong> 60K+</li>
              <li><strong>Views:</strong> 16M+</li>
              <li><strong>Martial Arts Certifications:</strong> International martial arts certifications</li>
              <li><strong>International Events Participation:</strong> Participation in international events</li>
            </ul>
          </section>
        </motion.div>
      );
    };
    
    export default AboutPage;
    `
    }
  }

  // 4. حذف خبر
  async function deleteNews(id: string) {
    const confirmDelete = confirm("هل أنت متأكد من حذف هذا الخبر؟");
    if (confirmDelete) {
      await supabase.from("news").delete().eq("id", id);
      fetchNews();
    }
  }

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-red-600">لوحة تحكم الأخبار</h1>

        {/* فورم الإضافة */}
        <form className="bg-zinc-900 p-8 rounded-2xl mb-12 flex flex-col gap-4 border border-zinc-800" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="عنوان الخبر" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-black border border-zinc-700 p-3 rounded-lg outline-none focus:border-red-600" />
          <textarea placeholder="وصف الخبر" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-black border border-zinc-700 p-3 rounded-lg h-32 outline-none focus:border-red-600" />
          <input type="file" accept="image/*" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" />
          <button onClick={addNews} className="bg-red-600 py-3 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50">
            {uploading ? "جاري الرفع..." : "نشر الخبر الآن"}
          </button>
        </form>

        {/* قائمة الأخبار للحذف */}
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold mb-4">الأخبار الحالية:</h2>
          {newsList.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-4">
                {item.image && <img src={item.image} className="w-16 h-16 object-cover rounded-lg" />}
                <p className="font-medium">{item.title}</p>
              </div>
              <button onClick={() => deleteNews(item.id)} className="bg-zinc-800 text-red-500 hover:bg-red-600 hover:text-white p-2 px-4 rounded-lg transition">حذف</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}