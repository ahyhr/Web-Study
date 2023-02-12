import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import * as cheerio from 'cheerio';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  // 爬虫
  async findAll() {
    const baseUrl = 'https://www.jpmnb.net';
    const urls: string[] = [];
    let index: number = 0;

    const getData = async () => {
      const body = await axios
        .get(`https://www.jpmnb.net/Jpst/19898${index ? `_${index}` : ''}.html`)
        .then(async (res) => res.data);
      const $ = cheerio.load(body);

      // 获取页数
      const page = $('.content-wrap .pagination1').eq(0).find('a');
      const pageArr = page
        .map(function () {
          return $(this).text();
        })
        .toArray();
      console.log(pageArr);

      // 获取图片
      if (pageArr.includes('下一页')) {
        $('.content-wrap div p img').each(function () {
          urls.push(baseUrl + $(this).attr('src'));
        });
        console.log(urls);
        index++;
        await getData();
      }
    };

    await getData();
    this.writeFile(urls);
    return urls;
  }
  // 保存图片
  writeFile(urls: string[]) {
    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url, { responseType: 'arraybuffer' })
        .then((res) => res.data);

      const ws = fs.createWriteStream(
        path.join(__dirname, '../cos/' + new Date().getTime() + '.jpg'),
      );
      ws.write(buffer);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} spider`;
  }

  update(id: number, updateSpiderDto: UpdateSpiderDto) {
    return `This action updates a #${id} spider`;
  }

  remove(id: number) {
    return `This action removes a #${id} spider`;
  }
}
