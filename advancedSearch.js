const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();

// Assuming you've already defined Mongoose models for Auctions, Profiles, Users, and YouTubeChannels
const Auction = mongoose.model('Auction');
const Profile = mongoose.model('Profile');
const User = mongoose.model('User');
const YouTubeChannel = mongoose.model('YouTubeChannel');

router.get('/auctions/advanced-search', async (req, res) => {
    try {
        const current_time = moment();
        const { search, min_price, max_price, min_channelsize, max_channelsize, content_type, status, deal_type, categories, age, gender, occupation, income_level, marital_status, parental_status, sexuality, geolocation, audience, video_visual, video_voice, video_style_options, language, country, sort_by, per_page = 10, page = 1 } = req.query;

        const query = Auction.aggregate([
            {
                $lookup: {
                    from: 'profiles',
                    localField: 'profile_id',
                    foreignField: 'profile_id',
                    as: 'profile'
                }
            },
            {
                $unwind: '$profile'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'profile.user_email',
                    foreignField: 'email',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'youtube_channels',
                    localField: 'youtube_channel',
                    foreignField: 'channel_id',
                    as: 'youtube_channel'
                }
            },
            {
                $unwind: { path: '$youtube_channel', preserveNullAndEmptyArrays: true }
            },
            {
                $match: {
                    ...(search && { $or: [{ 'user.fname': new RegExp(search, 'i') }, { 'user.lname': new RegExp(search, 'i') }, { title: new RegExp(search, 'i') }] }),
                    ...(min_price && { min_bid_price_val: { $gte: parseFloat(min_price) } }),
                    ...(max_price && { min_bid_price_val: { $lte: parseFloat(max_price) } }),
                    ...(min_channelsize && { 'youtube_channel.subscribers': { $gte: parseInt(min_channelsize) } }),
                    ...(max_channelsize && { 'youtube_channel.subscribers': { $lte: parseInt(max_channelsize) } }),
                    ...(content_type && { content_type }),
                    ...(status && {
                        $expr: {
                            $switch: {
                                branches: [
                                    { case: { $eq: [status, 'live'] }, then: { $and: [{ $lte: ['$startDate', current_time] }, { $gt: ['$endDate', current_time] }] } },
                                    { case: { $eq: [status, 'upcoming'] }, then: { $and: [{ $gt: ['$startDate', current_time] }, { $gt: ['$endDate', current_time] }] } },
                                    { case: { $eq: [status, 'ended'] }, then: { $lt: ['$endDate', current_time] } }
                                ],
                                default: true
                            }
                        }
                    }),
                    ...(categories && categories.length && { category: { $in: categories.map(cat => new RegExp(cat, 'i')) } }),
                    ...(country && { 'user.country_id': country })
                    // Add other conditions here
                }
            },
            {
                $sort: {
                    ...(sort_by === 'lowest_price' && { min_bid_price_val: 1 }),
                    ...(sort_by === 'highest_price' && { min_bid_price_val: -1 }),
                    ...(sort_by === 'newly_listed' && { created_at: -1 }),
                    ...(sort_by === 'end_date' && { endDate: -1 })
                }
            },
            { $skip: (parseInt(page) - 1) * parseInt(per_page) },
            { $limit: parseInt(per_page) },
            {
                $project: {
                    creator: {
                        name: { $concat: ['$user.fname', ' ', '$user.lname'] },
                        user_name: '$user.username',
                        img: '$profile.image',
                        country: '$user.country_id',
                        is_vip: { $eq: ['$user.vip_status', 1] },
                        yt_stats: {
                            subs: '$youtube_channel.subscribers',
                            av: { $cond: [{ $gt: ['$youtube_channel.total_videos', 0] }, { $divide: ['$youtube_channel.total_views', '$youtube_channel.total_videos'] }, 0] },
                            ac: { $cond: [{ $gt: ['$youtube_channel.total_videos', 0] }, { $divide: ['$youtube_channel.total_comments', '$youtube_channel.total_videos'] }, 0] },
                            er: {
                                $cond: [
                                    { $and: [{ $gt: ['$youtube_channel.total_videos', 0] }, { $gt: ['$youtube_channel.subscribers', 0] }] },
                                    { $multiply: [{ $divide: [{ $sum: ['$youtube_channel.total_likes', '$youtube_channel.total_dislikes', '$youtube_channel.total_comments'] }, { $add: ['$youtube_channel.total_videos', '$youtube_channel.subscribers'] }] }, 100] },
                                    0
                                ]
                            },
                            tv: '$youtube_channel.total_videos'
                        }
                    },
                    title: '$title',
                    starting_bid: '$min_bid_price_val',
                    start_date: '$startDate',
                    end_date: '$endDate',
                    auction_id: '$_id',
                    sales_format: '$sales_format',
                    ad_placement: '$ad_position',
                    featured_image: '$featured_image',
                    current_bid: 0,
                    rating: 0,
                    review_count: 0
                }
            }
        ]);

        const results = await query.exec();
        res.status(200).json({ message: 'filtered Auctions retrieved successfully!', results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving auctions.' });
    }
});

module.exports = router;
