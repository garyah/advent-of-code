namespace Advent2017
{
    class CaptchaDigitSummer
    {
    public:
        static unsigned sumRepeating(const char *input)
        {
            return sumRepeatingByOffset(input, 1);
        }

        static unsigned sumRepeatingOtherHalf(const char *input)
        {
            return sumRepeatingByOffset(input, strlen(input) / 2);
        }

    private:
        static unsigned sumRepeatingByOffset(const char *input, size_t offset)
        {
            auto result = 0u;
            auto length = strlen(input);
            for (size_t idx = 0; idx < length; ++idx)
            {
                if (input[idx] == input[(idx + offset) % length])
                    result += input[idx] - '0';
            }
            return result;
        }
    };
}
