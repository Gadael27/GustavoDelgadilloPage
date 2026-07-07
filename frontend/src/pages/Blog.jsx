import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import ghostApi from '../ghost';
import { Clock, User } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await ghostApi.posts.browse({
          limit: 10,
          include: 'tags,authors'
        });
        setPosts(res);
      } catch (err) {
        console.error("Error fetching from Ghost:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #03030c 0%, #0a0a1a 100%)',
      minHeight: '100vh',
      color: '#fff',
      paddingTop: '100px',
      paddingBottom: '60px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Helmet>
        <title>Blog Oficial | GDL Producciones</title>
        <meta name="description" content="Noticias, tendencias y consejos sobre eventos, DJs y cabinas." />
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-5">
        <h1 className="font-bangers text-[3rem] text-white text-center mb-2.5 tracking-[2px]">
          EL <span style={{ color: 'var(--color-brand-cyan)' }}>BLOG</span>
        </h1>
        <p className="text-center text-[#888] mb-[50px]">
          Lo último en tendencias, tips para bodas y lo más nuevo en equipo de audio.
        </p>

        {loading ? (
          <div className="text-center text-[var(--color-brand-cyan)]">Cargando artículos...</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
            {posts.map((post) => (
              <div key={post.id} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'transform 0.3s'
              }} className="hover:scale-105">
                {post.feature_image && (
                  <img src={post.feature_image} alt={post.title} className="w-full h-[200px] object-cover" />
                )}
                <div className="p-[25px]">
                  <div className="flex gap-[10px] mb-[15px]">
                    {post.tags?.map(tag => (
                      <span key={tag.id} className="bg-[var(--color-brand-pink)] text-white px-2.5 py-0.5 rounded-full text-[0.7rem] font-bold uppercase">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-[1.2rem] font-bold mb-2.5 leading-[1.4]">
                    {post.title}
                  </h2>
                  <p className="text-[#aaa] text-[0.9rem] mb-5 leading-[1.5] line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center border-t border-white/10 pt-[15px]">
                    <div className="flex items-center gap-2 text-[#888] text-[0.8rem]">
                      <User size={14} /> {post.primary_author?.name}
                    </div>
                    <div className="flex items-center gap-2 text-[#888] text-[0.8rem]">
                      <Clock size={14} /> {new Date(post.published_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {posts.length === 0 && !loading && (
          <div className="text-center text-[#666] mt-[40px]">
            No hay publicaciones por el momento.
          </div>
        )}
      </div>
    </div>
  );
}
