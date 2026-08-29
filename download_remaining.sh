#!/bin/bash
set -e
curl -s "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" -o public/hero.jpg
curl -s "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop" -o public/unsplash1.jpg
curl -s "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1000&auto=format&fit=crop" -o public/unsplash2.jpg
curl -s "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1000&auto=format&fit=crop" -o public/unsplash3.jpg
curl -s "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop" -o public/unsplash4.jpg
curl -s "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop" -o public/unsplash5.jpg
curl -s "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=800&auto=format&fit=crop" -o public/unsplash6.jpg
echo "Downloaded"
