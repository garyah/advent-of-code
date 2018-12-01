namespace Advent2017
{
    class StreamProcessor
    {
    public:
        static const char *EatGarbage(const char *input)
        {
            if (*input != '<') return input;
            auto isEscaped = false;
            for (++input; *input != 0; ++input)
            {
                if (isEscaped) { isEscaped = false; continue; }
                if (*input == '!') isEscaped = true;
                if (*input == '>') return ++input;
            }
            return input;
        }

        static const char *EatGroup(
            const char *input,
            unsigned& numberGroups,
            unsigned *groupScore = nullptr
            )
        {
            if (*input != '{') return input;
            if (groupScore != nullptr) *groupScore += 1;
            for (++input; *input != 0; ++input)
            {
                if (*input == '{') input = EatGroup(input, numberGroups, groupScore);
                if (*input == '<') input = EatGarbage(input);
                if (*input == '}')
                {
                    ++input; ++numberGroups;
                    if (groupScore != nullptr) TotalGroupScore += *groupScore;
                    break;
                }
            }
            if (groupScore != nullptr) *groupScore -= 1;
            return input;
        }

        static unsigned TotalGroupScore;
    };
}
