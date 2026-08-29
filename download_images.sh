#!/bin/bash
set -e

# Badshahi Mosque
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Badshahi_Mosque_%28Lahore%29.jpg/800px-Badshahi_Mosque_%28Lahore%29.jpg" -o public/badshahi.jpg
# Lahore Fort
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Alamgiri_Gate_and_Hazuri_Bagh_Baradari.jpg/800px-Alamgiri_Gate_and_Hazuri_Bagh_Baradari.jpg" -o public/lahore_fort.jpg
# Faisal Masjid
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Faisal_Mosque_snuggled_in_the_hills_of_Margalla.jpg/800px-Faisal_Mosque_snuggled_in_the_hills_of_Margalla.jpg" -o public/faisal.jpg
# Wazir Khan Mosque
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Masjid_Wazir_Khan_Aerial_View.jpg/800px-Masjid_Wazir_Khan_Aerial_View.jpg" -o public/wazir_khan.jpg
# Pakistan Monument
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Blue_Hour_at_Pakistan_Monument.jpg/800px-Blue_Hour_at_Pakistan_Monument.jpg" -o public/pak_monument.jpg
# Khewra Salt Mine
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Khewra_Salt_Mine_Interior.jpg/800px-Khewra_Salt_Mine_Interior.jpg" -o public/khewra.jpg
# Mohatta Palace Museum
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mohatta_Palace%2C_Karachi%2C_Pakistan.jpg/800px-Mohatta_Palace%2C_Karachi%2C_Pakistan.jpg" -o public/mohatta.jpg
# Port Grand - Karachi
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Port-Grand-Karachi-04.jpg/800px-Port-Grand-Karachi-04.jpg" -o public/port_grand.jpg
# Dolmen Mall - Clifton
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Dolmen_City_Mall.jpg/800px-Dolmen_City_Mall.jpg" -o public/dolmen.jpg
# Hunza Valley
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Hunza_Valley_2.jpg/800px-Hunza_Valley_2.jpg" -o public/hunza.jpg
# K2
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/K2_2006b.jpg/800px-K2_2006b.jpg" -o public/k2.jpg
# Fairy Meadows
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Fairy_Meadows_and_Nanga_Parbat.jpg/800px-Fairy_Meadows_and_Nanga_Parbat.jpg" -o public/fairy_meadows.jpg
# Attabad Lake
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Attabad_Lake_Hunza_Valley.jpg/800px-Attabad_Lake_Hunza_Valley.jpg" -o public/attabad.jpg
# N-35
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Karakoram_Highway_near_Passu.jpg/800px-Karakoram_Highway_near_Passu.jpg" -o public/n35.jpg

echo "All images downloaded successfully."
