const TeamDetail = require("../models/teamDetail");
const TeamMember = require("../models/TeamMemberSchema");

exports.createTeamDescription = async (req, res) => {
  try {
    const { description, teamName } = req.body;

    if (!description || !teamName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const response = await TeamDetail.create({ description, teamName });

    return res.status(200).json({
      success: true,
      message: "Data submitted successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: " + error.message,
    });
  }
};

exports.getTeamDetails = async (req, res) => {
  try {
    const { teamName } = req.params;

    if (!teamName) {
      return res.status(400).json({
        success: false,
        message: "Team name is required",
      });
    }

    const teamMembers = await TeamMember.find({ TeamName: teamName }).lean();

    res.status(200).json({
      success: true,
      data: {
        teamMembers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching team details",
      error: error.message,
    });
  }
};
